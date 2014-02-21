'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('ligneL', [ 'ngRoute', 'ngResource', 'ngStorage' ]);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/horaires.html', controller: 'HorairesCtrl', route:'accueil'});
  $routeProvider.when('/ajout', {templateUrl: 'partials/ajout.html', controller: 'HorairesCtrl'});
  $routeProvider.when('/aide', {templateUrl: 'partials/aide.html', controller: ''});
  $routeProvider.when('/apropos', {templateUrl: 'partials/apropos.html', controller: ''});
  $routeProvider.when('/options', {templateUrl: 'partials/options.html', controller: ''});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


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

app.directive('modalmenu', function() {
  return {
    restrict: 'A',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal-menu' ng-show='show'><div class='ng-modal-menu-overlay' ng-click='hideModal()'></div><div class='ng-modal-menu-dialog' ng-style='dialogStyle'><div class='ng-modal-menu-dialog-content' ng-transclude></div></div></div>"
  };
});

app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});