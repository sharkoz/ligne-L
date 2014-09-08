angular.module('ligneL')
.directive('nextSlideEraser', ['$swipe',
  function($swipe) {
    var max = 250;
    var min = 150;

    return {
      restrict: 'EA',
      scope: {
        'action': '&onSwipe'
      },
      link: function(scope, ele, attrs, ctrl) {
        var startX, pointX;

        $swipe.bind(ele, {
          'start': function(coords) {
            startX = coords.x;
            startY = coords.y;
          },
          'move': function(coords) {
            var delta = coords.x - startX;
            if(Math.abs(delta) < max) {
              translateX(delta, ele);
            }
          },
          'end': function(coords) {
            var delta = coords.x - startX;
            if(Math.abs(delta) > min) {
			  scope.action();
			  translateX(0, ele);
            }
            else {
              translateX(0, ele);
            }
          },
          'cancel': function(coords) {
            translateX(0, ele);
          }
        });
      }
    }

    function translateX(val, ele) {
  	  if(val == 0) {
        ele.css('transition', '0.1s ease-in all');
        ele.css('-webkit-transition', '0.1s ease-in all');
      }
      ele.css('-webkit-transform', 'translateX(' + val + 'px)');
      ele.css('transform', 'translateX(' + val + 'px)');
      ele.css('opacity', 1-Math.abs(val)/(1.5*max));
    }
}]);