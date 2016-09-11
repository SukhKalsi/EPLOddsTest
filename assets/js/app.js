'use strict';

var app = angular.module('EPLOddsApp', []);

app.controller('oddsController', ['$scope', 'dataService', function ($scope, $dataService) {
  var oddsEndpoint = 'data/odds.json';
  $scope.propertyName = 'betfair';
  $scope.reverse = false;

  $dataService.get(oddsEndpoint).success(function (response) {
    $scope.teamList = response;
  }).error(function(response) {
    console.log('failure', response);
  });

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
    console.log($scope.propertyName, $scope.reverse);
  };

  $scope.localeSensitiveComparator = function(v1, v2) {
    var result = 0;
        
    switch ($scope.propertyName) {
      case 'team':
        if (v1.type !== 'string' || v2.type !== 'string') {
          return (v1.index < v2.index) ? -1 : 1;
        }
        
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
        break

      case 'betfair':
        v1 = parseFloat(v1.value.price);
        v2 = parseFloat(v2.value.price);
        break;

      case 'betvictor':
      case 'paddypower':
        if (v1.type !== 'object') {
          return (v1.index < v2.index) ? -1 : 1; 
        }

        v1 = parseFloat(v1.value.price.value / v1.value.price.to);
        v2 = parseFloat(v2.value.price.value / v2.value.price.to);

        break;

      default:
        return result;
    }


    if (v1 !== v2) {
      result = v1 < v2 ? -1 : 1;
    }

    return result;

  };

}]);

app.factory('dataService', ['$http', function ($http) {
  return {
    get: function(url) {
      return $http.get(url);
    }
  };
}]);

app.filter('formatBet', function() {
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

  function reduce(a, b) {
    var n  = new Array(2);
    var f = GCD(a, b);
    n[0] = a/f;
    n[1] = b/f;
    return n;
  }

  function GCD(num1, num2) {
    var a; var b;
    if (num1 < num2) {a = num2; b = num1;}
    else if (num1 > num2) {a = num1; b = num2;}
    else if (num1 == num2) {return num1;}
    while(1) {
      if (b == 0) {
        return a;
      }
      else {
        var temp = b;
        b = a % b;
        a = temp;
      }
    }
  }

  return filter;
});
