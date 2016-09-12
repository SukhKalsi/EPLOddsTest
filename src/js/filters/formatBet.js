'use strict';

var reduce = require('../generic/reduce');

module.exports = function() {
  var filter = function(bet) {

    switch (bet.format_type) {
      case 'fraction':
        return bet.price.value + '/' + bet.price.to;

      case 'decimal':
        var decimal = parseFloat(bet.price).toFixed(2);
        var num = (decimal - 1) * 10000;
        var dom = 10000;
        var reduced = reduce(Math.round(num), dom);
        num = reduced[0];
        dom = reduced[1];

        return(num + '/' + dom);
    
      default:
        return price;
        break;
    }
  }

  return filter;
};
