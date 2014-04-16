/**
 * angular-strap-modal
 * @version v2.0.1 - 2014-04-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('mgcrea.ngStrap.modal', ['mgcrea.ngStrap.helpers.dimensions']).provider('$modal', function () {
  var defaults = this.defaults = {
      animation: 'am-fade',
      backdropAnimation: 'am-fade',
      prefixClass: 'modal',
      prefixEvent: 'modal',
      placement: 'top',
      template: 'partials/modal.tpl.html',
      contentTemplate: false,
      container: false,
      element: null,
      backdrop: true,
      keyboard: true,
      html: false,
      show: true
    };
  this.$get = [
    '$window',
    '$rootScope',
    '$compile',
    '$q',
    '$templateCache',
    '$http',
    '$animate',
    '$timeout',
    '$sce',
    'dimensions',
    function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, $sce, dimensions) {
      var forEach = angular.forEach;
      var trim = String.prototype.trim;
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      var bodyElement = angular.element($window.document.body);
      var htmlReplaceRegExp = /ng-bind="/gi;
      function ModalFactory(config) {
        var $modal = {};
        // Common vars
        var options = $modal.$options = angular.extend({}, defaults, config);
        $modal.$promise = fetchTemplate(options.template);
        var scope = $modal.$scope = options.scope && options.scope.$new() || $rootScope.$new();
        if (!options.element && !options.container) {
          options.container = 'body';
        }
        // Support scope as string options
        forEach([
          'title',
          'content'
        ], function (key) {
          if (options[key])
            scope[key] = $sce.trustAsHtml(options[key]);
        });
        // Provide scope helpers
        scope.$hide = function () {
          scope.$$postDigest(function () {
            $modal.hide();
          });
        };
        scope.$show = function () {
          scope.$$postDigest(function () {
            $modal.show();
          });
        };
        scope.$toggle = function () {
          scope.$$postDigest(function () {
            $modal.toggle();
          });
        };
        // Support contentTemplate option
        if (options.contentTemplate) {
          $modal.$promise = $modal.$promise.then(function (template) {
            var templateEl = angular.element(template);
            return fetchTemplate(options.contentTemplate).then(function (contentTemplate) {
              var contentEl = findElement('[ng-bind="content"]', templateEl[0]).removeAttr('ng-bind').html(contentTemplate);
              // Drop the default footer as you probably don't want it if you use a custom contentTemplate
              if (!config.template)
                contentEl.next().remove();
              return templateEl[0].outerHTML;
            });
          });
        }
        // Fetch, compile then initialize modal
        var modalLinker, modalElement;
        var backdropElement = angular.element('<div class="' + options.prefixClass + '-backdrop"/>');
        $modal.$promise.then(function (template) {
          if (angular.isObject(template))
            template = template.data;
          if (options.html)
            template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
          template = trim.apply(template);
          modalLinker = $compile(template);
          $modal.init();
        });
        $modal.init = function () {
          // Options: show
          if (options.show) {
            scope.$$postDigest(function () {
              $modal.show();
            });
          }
        };
        $modal.destroy = function () {
          // Remove element
          if (modalElement) {
            modalElement.remove();
            modalElement = null;
          }
          if (backdropElement) {
            backdropElement.remove();
            backdropElement = null;
          }
          // Destroy scope
          scope.$destroy();
        };
        $modal.show = function () {
          scope.$emit(options.prefixEvent + '.show.before', $modal);
          var parent = options.container ? findElement(options.container) : null;
          var after = options.container ? null : options.element;
          // Fetch a cloned element linked from template
          modalElement = $modal.$element = modalLinker(scope, function (clonedElement, scope) {
          });
          // Set the initial positioning.
          modalElement.css({ display: 'block' }).addClass(options.placement);
          // Options: animation
          if (options.animation) {
            if (options.backdrop) {
              backdropElement.addClass(options.backdropAnimation);
            }
            modalElement.addClass(options.animation);
          }
          if (options.backdrop) {
            $animate.enter(backdropElement, bodyElement, null, function () {
            });
          }
          $animate.enter(modalElement, parent, after, function () {
            scope.$emit(options.prefixEvent + '.show', $modal);
          });
          scope.$isShown = true;
          scope.$$phase || scope.$root.$$phase || scope.$digest();
          // Focus once the enter-animation has started
          // Weird PhantomJS bug hack
          var el = modalElement[0];
          requestAnimationFrame(function () {
            el.focus();
          });
          bodyElement.addClass(options.prefixClass + '-open');
          if (options.animation) {
            bodyElement.addClass(options.prefixClass + '-with-' + options.animation);
          }
          // Bind events
          if (options.backdrop) {
            modalElement.on('click', hideOnBackdropClick);
            backdropElement.on('click', hideOnBackdropClick);
          }
          if (options.keyboard) {
            modalElement.on('keyup', $modal.$onKeyUp);
          }
        };
        $modal.hide = function () {
          scope.$emit(options.prefixEvent + '.hide.before', $modal);
          $animate.leave(modalElement, function () {
            scope.$emit(options.prefixEvent + '.hide', $modal);
            bodyElement.removeClass(options.prefixClass + '-open');
            if (options.animation) {
              bodyElement.addClass(options.prefixClass + '-with-' + options.animation);
            }
          });
          if (options.backdrop) {
            $animate.leave(backdropElement, function () {
            });
          }
          scope.$isShown = false;
          scope.$$phase || scope.$root.$$phase || scope.$digest();
          // Unbind events
          if (options.backdrop) {
            modalElement.off('click', hideOnBackdropClick);
            backdropElement.off('click', hideOnBackdropClick);
          }
          if (options.keyboard) {
            modalElement.off('keyup', $modal.$onKeyUp);
          }
        };
        $modal.toggle = function () {
          scope.$isShown ? $modal.hide() : $modal.show();
        };
        $modal.focus = function () {
          modalElement[0].focus();
        };
        // Protected methods
        $modal.$onKeyUp = function (evt) {
          evt.which === 27 && $modal.hide();
        };
        // Private methods
        function hideOnBackdropClick(evt) {
          if (evt.target !== evt.currentTarget)
            return;
          options.backdrop === 'static' ? $modal.focus() : $modal.hide();
        }
        return $modal;
      }
      // Helper functions
      function findElement(query, element) {
        return angular.element((element || document).querySelectorAll(query));
      }
      function fetchTemplate(template) {
        return $q.when($templateCache.get(template) || $http.get(template)).then(function (res) {
          if (angular.isObject(res)) {
            $templateCache.put(template, res.data);
            return res.data;
          }
          return res;
        });
      }
      return ModalFactory;
    }
  ];
}).directive('bsModal', [
  '$window',
  '$location',
  '$sce',
  '$modal',
  function ($window, $location, $sce, $modal) {
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {
        // Directive options
        var options = {
            scope: scope,
            element: element,
            show: false
          };
        angular.forEach([
          'template',
          'contentTemplate',
          'placement',
          'backdrop',
          'keyboard',
          'html',
          'container',
          'animation'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        // Support scope as data-attrs
        angular.forEach([
          'title',
          'content'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = $sce.trustAsHtml(newValue);
          });
        });
        // Support scope as an object
        attr.bsModal && scope.$watch(attr.bsModal, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
        // Initialize modal
        var modal = $modal(options);
        // Trigger
        element.on(attr.trigger || 'click', modal.toggle);
        // Garbage collection
        scope.$on('$destroy', function () {
          modal.destroy();
          options = null;
          modal = null;
        });
      }
    };
  }
]);

angular.module('mgcrea.ngStrap.helpers.dimensions', []).factory('dimensions', [
  '$document',
  '$window',
  function ($document, $window) {
    var jqLite = angular.element;
    var fn = {};
    /**
     * Test the element nodeName
     * @param element
     * @param name
     */
    var nodeName = fn.nodeName = function (element, name) {
        return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
      };
    /**
     * Returns the element computed style
     * @param element
     * @param prop
     * @param extra
     */
    fn.css = function (element, prop, extra) {
      var value;
      if (element.currentStyle) {
        //IE
        value = element.currentStyle[prop];
      } else if (window.getComputedStyle) {
        value = window.getComputedStyle(element)[prop];
      } else {
        value = element.style[prop];
      }
      return extra === true ? parseFloat(value) || 0 : value;
    };
    /**
     * Provides read-only equivalent of jQuery's offset function:
     * @required-by bootstrap-tooltip, bootstrap-affix
     * @url http://api.jquery.com/offset/
     * @param element
     */
    fn.offset = function (element) {
      var boxRect = element.getBoundingClientRect();
      var docElement = element.ownerDocument;
      return {
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
        left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
      };
    };
    /**
     * Provides read-only equivalent of jQuery's position function
     * @required-by bootstrap-tooltip, bootstrap-affix
     * @url http://api.jquery.com/offset/
     * @param element
     */
    fn.position = function (element) {
      var offsetParentRect = {
          top: 0,
          left: 0
        }, offsetParentElement, offset;
      // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
      if (fn.css(element, 'position') === 'fixed') {
        // We assume that getBoundingClientRect is available when computed position is fixed
        offset = element.getBoundingClientRect();
      } else {
        // Get *real* offsetParentElement
        offsetParentElement = offsetParent(element);
        offset = fn.offset(element);
        // Get correct offsets
        offset = fn.offset(element);
        if (!nodeName(offsetParentElement, 'html')) {
          offsetParentRect = fn.offset(offsetParentElement);
        }
        // Add offsetParent borders
        offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
        offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
      }
      // Subtract parent offsets and element margins
      return {
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
        left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
      };
    };
    /**
     * Returns the closest, non-statically positioned offsetParent of a given element
     * @required-by fn.position
     * @param element
     */
    var offsetParent = function offsetParentElement(element) {
      var docElement = element.ownerDocument;
      var offsetParent = element.offsetParent || docElement;
      if (nodeName(offsetParent, '#document'))
        return docElement.documentElement;
      while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docElement.documentElement;
    };
    /**
     * Provides equivalent of jQuery's height function
     * @required-by bootstrap-affix
     * @url http://api.jquery.com/height/
     * @param element
     * @param outer
     */
    fn.height = function (element, outer) {
      var value = element.offsetHeight;
      if (outer) {
        value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
      } else {
        value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
      }
      return value;
    };
    /**
     * Provides equivalent of jQuery's height function
     * @required-by bootstrap-affix
     * @url http://api.jquery.com/width/
     * @param element
     * @param outer
     */
    fn.width = function (element, outer) {
      var value = element.offsetWidth;
      if (outer) {
        value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
      } else {
        value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
      }
      return value;
    };
    return fn;
  }
]);
