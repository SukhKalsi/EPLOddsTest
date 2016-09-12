'use strict';

module.exports = ['$scope', 'dataService', function ($scope, $dataService) {
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

}];
