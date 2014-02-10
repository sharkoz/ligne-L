'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('ligneL', [ 'ngRoute', 'ngResource', 'ngStorage' ]);

/*
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/horaires.html', controller: 'HorairesCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
*/

app.directive('clock', function($timeout, dateFilter){
    return function(scope, element, attrs){
       var timeoutId; // timeoutId, so that we can cancel the time updates
 
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          element.text(dateFilter(new Date(), 'HH:mm:ss '));
          updateLater(); // schedule another update
        }, 1000);
      }
        
      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
    }
});