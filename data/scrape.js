var request = require("request");
var cheerio = require("cheerio");
var cheerioTableparser = require('cheerio-tableparser');

var options = {
  url: 'https://www.justbookies.com/premier-league-odds/',
  headers: {
    'User-Agent': 'request'
  }
};

function saveData() {
}

function requestHandler(error, response, body) {
  if (error) {
		console.log("Couldn’t get page because of error: " + error);
		return;
	}

  console.log(body);
  // Load body into cheerio - which is effectively our jQuery'esqu lib to traverse the DOM
  var $ = cheerio.load(body);
  var entries = $('.entry');

  entries.each(function (i, entry) {
    var h3s = $(entry).find("h3 span.red");
    var sectionHeader = h3s.length ? h3s[0] : null;
    console.log(sectionHeader);
    if (sectionHeader === 'Premier League – Outright Winner Odds') {
      var tables = $(entry).find('table');
      var winnersTable = tables[0];
      cheerioTableparser(winnersTable);
      var data = winnersTable("table").parsetable();
      console.log('data');
    }
  });
}

// lift off...
console.log('begin...');
request(options, requestHandler);
