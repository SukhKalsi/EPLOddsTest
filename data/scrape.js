'use strict';

var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var cheerioTableparser = require('cheerio-tableparser');
var betfairOdds = require('./betfair');

var options = {
  url: 'https://www.justbookies.com/premier-league-odds/',
  headers: {
    'User-Agent': 'request'
  }
};

function concatenate(collection) {
  var filename = __dirname + '/odds.json';
  var jsonData = [];
  
  if (collection && collection.length) {
    for (var collectionItem of collection) {

      if (betfairOdds.hasOwnProperty(collectionItem.name) === false) {
        console.log(collectionItem.name);
      }
      var betObj = {
        price: betfairOdds[collectionItem.name],
        format_type: 'decimal'
      }

      collectionItem.betfair = betObj
    }

    jsonData = collection; // clone it
  } else {
    for (var prop in betfairOdds) {
      var betObj = {
        name: prop,
        betfair: {
          price: betfairOdds[prop],
          format_type: 'decimal'
        }
      };

      jsonData.push(betObj);
    }
  }

  // console.log(collection);
  fs.writeFile(filename, JSON.stringify(jsonData), function (err) {
    if (err) return console.log(err);
    console.log('Completed JSON');
  });
  
}

function requestHandler(error, response, body) {
  if (error) {
		console.log("Couldn’t get page because of error: " + error);
		return;
	}

  // console.log(body);
  // Load body into cheerio - which is effectively our jQuery'esqu lib to traverse the DOM
  var $ = cheerio.load(body);
  var entries = $('.entry');
  var oddsCollection = [];

  entries.each(function (i, entry) {
    var h3s = $(entry).find("h3 span.red");
    var sectionHeader = h3s.length ? h3s[0] : null;

    if (sectionHeader.children[0].data === 'Premier League – Outright Winner Odds') {
      
      var tables = $(entry).find('table');
      var winnersTable = cheerio.load(tables[0]);
      cheerioTableparser(winnersTable);
      var data = winnersTable("table").parsetable(false, false, false);

      data.forEach(function(dataItems, index) {
        
        var teamIndex = 0;

        dataItems.forEach(function(item) {
          
          var strippedTags = item.replace(/(<([^>]+)>)/ig,"");
          
          if (strippedTags.trim() !== '') {
          
            if (index === 0) {
              oddsCollection.push({
                "name": strippedTags
              });
            } else {
              var bettingAgent = item.match(/href="\/go-to\/([^"]*)\//)[1];
              var priceObj = strippedTags.split('/');

              oddsCollection[teamIndex][bettingAgent] = {
                'price': {
                  "value": priceObj[0],
                  "to": priceObj[1]
                },
                format_type: 'fraction'
              };
              teamIndex += 1;
            }
          }
        });
      });
    }
  });

  concatenate(oddsCollection);
}

// lift off...
console.log('begin...');
request(options, requestHandler);
