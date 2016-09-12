'use strict';

require('angular');
var oddsController = require('./controllers/oddsController');;
var dataService = require('./services/dataService');
var formatBetFilter = require('./filters/formatBet');

var app = angular.module('EPLOddsApp', []);
app.controller('oddsController', oddsController);
app.factory('dataService', dataService);
app.filter('formatBet', formatBetFilter);
