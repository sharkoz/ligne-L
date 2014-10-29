function SpinnersService ($rootScope) {
	var SpinnersService = {};
	
	// Contient les classes à mettre aux spinners, au début on met une classe vide
	SpinnersService.gps="";
	SpinnersService.refresh="";

	SpinnersService.setGps = function(){
		SpinnersService.gps="spin_image";
	}

	SpinnersService.resetGps = function(){
		SpinnersService.gps="";
	}

	SpinnersService.setRefresh = function(){
		$rootScope.refresh="spin_image";
	}

	SpinnersService.resetRefresh = function(){
		$rootScope.refresh="";
		$rootScope.$broadcast('scroll.refreshComplete');
	}

	return SpinnersService;
}
angular
  .module('ligneL')
  .factory('SpinnersService', SpinnersService);