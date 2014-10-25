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
}
angular
  .module('ligneL')
  .filter('distance', distance);