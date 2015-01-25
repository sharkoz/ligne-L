function SpinnersService ($rootScope) {
	var SpinnersService = {};
	
	// Contient les classes à mettre aux spinners, au début on met une classe vide
	SpinnersService.gps="";
	$rootScope.refresh={};

	SpinnersService.setGps = function(){
		SpinnersService.gps="spin_image";
	}

	SpinnersService.resetGps = function(){
		SpinnersService.gps="";
	}

	SpinnersService.setRefresh = function(idTrajet){
		$rootScope.refresh[idTrajet]="spin_image";
	}

	SpinnersService.resetRefresh = function(idTrajet){
		$rootScope.refresh[idTrajet]="";
		$rootScope.$broadcast('scroll.refreshComplete');
	}

	SpinnersService.errorRefresh = function(idTrajet){
		$rootScope.refresh[idTrajet]="error";
		$rootScope.$broadcast('scroll.refreshComplete');
	}

	return SpinnersService;
}
angular
  .module('ligneL')
  .factory('SpinnersService', SpinnersService);