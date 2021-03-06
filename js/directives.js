angular.module('ligneL')
.directive('nextSlideEraser', ['$swipe',
  function($swipe) {
    var max = 250;
    var min = 150;

    return {
      restrict: 'EA',
      scope: {
        'action': '&nextSwipe'
      },
      link: function(scope, ele, attrs, ctrl) {
        var startX, pointX;

        $swipe.bind(ele, {
          'start': function(coords) {
            startX = coords.x;
            startY = coords.y;
			//console.log("start :"+startX+" "+startY);
          },
          'move': function(coords) {
            var delta = coords.x - startX;
            if(Math.abs(delta) < max) {
              translateX(delta, ele);
            }
          },
          'end': function(coords) {
            var delta = coords.x - startX;
			//console.log("End :"+coords.x+" "+coords.y);
			//console.log("Delta :"+delta);
            if(Math.abs(delta) > min) {
				//console.log("Action");
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
      else {
        ele.css('transition', 'none');
        ele.css('-webkit-transition', 'none');
      }
      ele.css('-webkit-transform', 'translateX(' + val + 'px)');
      ele.css('transform', 'translateX(' + val + 'px)');
      ele.css('opacity', 1-Math.abs(val)/(1.5*max));
    }
}]);


angular.module('ligneL')
.directive('menuClosePerso', [function() {
  return {
    restrict: 'AC',
    link: function($scope, $element) {
      $element.bind('click', function() {
        var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
        if (sideMenuCtrl) {
          sideMenuCtrl.close();
        }
      });
    }
  };
}]);