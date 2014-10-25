function libGare () {
  return function (items, code) {
    return _.find(items, function (item) {
    	item.code === code;
    });
  };
}
angular
  .module('ligneL')
  .filter('libGare', libGare);