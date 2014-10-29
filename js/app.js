'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('ligneL', [ 'ngResource', 'ionic', 'ui.sortable', 'ui.router', 'ui.bootstrap', 'ngTouch', 'ngStorage', "angucomplete", 'angular-carousel', 'mgcrea.ngStrap.modal', 'firebase' ]);

app.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise("/");

  $stateProvider
    .state('horaires', {
      url: "/",
      templateUrl: "partials/horaires.html",
	  controller: 'HorairesCtrl'
    })
	.state('ajout', {
      url: "/ajout",
      templateUrl: "partials/ajout.html",
	  controller: 'HorairesCtrl'
    })
	.state('aide', {
      url: "/aide",
      templateUrl: "partials/aide.html"
    })
	.state('apropos', {
      url: "/apropos",
      templateUrl: "partials/apropos.html"
    })
	.state('options', {
      url: "/options",
      templateUrl: "partials/options.html"
    })
	.state('agenda', {
      url: "/agenda?id",
      templateUrl: "partials/agenda.html",
	  controller: 'AgendaCtrl'
    })
	.state('cloud', {
      url: "/cloud",
      templateUrl: "partials/firebase.html"
    });
});

app.run( [ '$rootScope', function ($rootScope) { $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) { $rootScope.$viewHistory.backView = true }); }]);

app.filter('future', function() {
	return function(collection) {
		var res = new Array;
		var now = new Date(Date.now()).getTime();
		if (collection===undefined) {
			return ;
		}
		else {
			for (var i=0, len=collection.length; i<len; i++) {
				if (collection[i]['date']['jsdate'] >= now) {
					res.push(collection[i]);
					//console.log("true");
				}
				//console.log("i : "+i+" len : " + len + " var : " +collection[i]['date']['jsdate'] + " / now : " +now);
			}
		}
     return res;
   };
});

app.filter('daily', function() {
	return function(input, day) {
		var res = new Array;
		if (input===undefined) {
			return ;
		}
		else {
			for (var i=0, len=input.length; i<len; i++) {
				if (input[i]['valid']['deb'] <= day && input[i]['valid']['fin'] >= day) {
					res.push(input[i]);
				}
			}
		}
     return res;
   };
});

app.filter('toDay', function() {
	return function(input) {
     return Math.floor(new Date(input).getTime()/86400000);
   };
});

app.filter('formatAddDate', function() {
return function(input) {
	var date = new Date();
	var result = new Date(date);
	result.setDate(date.getDate() + input);
	return result.getFullYear()+'-'+('0'+(result.getMonth()+1)).substr(-2)+'-'+('0'+result.getDate()).substr(-2);
	}
});

app.filter('agenda', function(toDayFilter, formatAddDateFilter) {
	return function(collection, scope) {
		var res = new Array;
		var train;
		var today=Math.floor(new Date().getTime()/86400000);
		var slideIndex = scope.slideIndex;
		if (collection===undefined) {
			return ;
		}
		else {
			for (var i=0, len=collection.length; i<len; i++) {
				train=collection[i];
				if (toDayFilter(train.valid.deb) >	today+slideIndex || toDayFilter(train.valid.fin) <today+slideIndex || (!!train.valid.moins && train.valid.moins.indexOf(formatAddDateFilter(slideIndex)))>-1) {
					// Do nothing
				}
				else {
					res.push(collection[i]);
				}
				//console.log("i : "+i+" len : " + len + " var : " +collection[i]['date']['jsdate'] + " / now : " +now);
			}
		}
     return res;
   };
});

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

app.directive('modaldialog', function() {
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
        scope.closeModal = function(){
            scope.$parent.modal = false;
            scope.$parent.train = undefined;
            scope.$parent.dest = undefined;
            scope.$parent.detail = undefined;
        };
    },
    template: "<div class='ng-modal-di' ng-show='show'><div class='ng-modal-overlay' ng-click='closeModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle' ng-transclude></div></div>"
  };
});