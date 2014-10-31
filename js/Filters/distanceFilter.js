function distance () {
  return function (dist) {
		if(dist<100){
			res = 'à <100m';
		}
		else if(dist<950){
			res = 'à '+Math.round(dist/100)*100+'m';
		}
		else{
			res = 'à '+Math.round(dist/1000)+'km';
		}
		return res;
	};
  };

angular
  .module('ligneL')
  .filter('distance', distance);

function formatSpecial(){
	return function(text){
		//if(text == undefined){text = ''};
	    console.log(text);
	    //var res = text.replace(/[^a-zéèà]/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a');
	    return text;
	};
};
angular
  .module('ligneL')
  .filter('formatSpecial', formatSpecial);