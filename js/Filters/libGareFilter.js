function libGare (LIB_GARE) {
  return function (code) {
  	    if(code === undefined){
    		return '';
    	}
    	else{
    		return _.find(LIB_GARE, function (item) {
    	  		return item.code === code;
    		}).name;
    	}

  };
}
angular
  .module('ligneL')
  .filter('libGare', libGare);

