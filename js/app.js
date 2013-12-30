'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('ligneL', [ 'ngRoute', 'ngResource', 'ngStorage' ]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/horaires.html', controller: 'HorairesCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
/*
app.filter('toDictionaryArray', function () {
    return function (obj) {
        if (!(obj instanceof Object)) return obj;

        var arr = [];
        for (var cle in obj) {
            arr.push({ key: cle, val: obj[cle] });
        }
        return arr;
    }
});
*/