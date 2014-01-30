'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('ligneL', [ 'ngRoute', 'ngResource', 'ngStorage' ]);

/*
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/horaires.html', controller: 'HorairesCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

