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

function addDays(){
	return function(days){
		var date = new Date();
	    var result = new Date(date);
	    result.setDate(date.getDate() + days);
	    return result;
	    //return result.toLocaleDateString();
	};
};
angular
  .module('ligneL')
  .filter('addDays', addDays);