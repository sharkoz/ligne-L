angular.module('ligneL')
.directive('nextSlideEraser', ['$swipe',
  function($swipe) {
    var max = 150;
    var min = 50;

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
            console.log('move')
          },
          'end': function(coords) {
            var delta = coords.x - startX;
            console.log('end')
            if(Math.abs(delta) > min) {
              console.log('doIt')
              scope.action();
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
      ele.css('-webkit-transform', 'translateX(' + val + 'px)');
      ele.css('transform', 'translateX(' + val + 'px)');
      ele.css('opacity', 1-Math.abs(val)/(2*max));
    }
}]);