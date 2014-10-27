function SpinnersService () {
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
		SpinnersService.refresh="spin_image";
	}

	SpinnersService.resetRefresh = function(){
		SpinnersService.refresh="";
	}

	return SpinnersService;
}
angular
  .module('ligne-L')
  .factory('SpinnersService', SpinnersService);