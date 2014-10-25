function TrajetsService ($document, $window) {
	var TrajetsService = {};
	
	TrajetsService.RefreshAll = function(){
		// TODO : remplace le broadcast
	}


	return TrajetsService;
}
angular
  .module('ligne-L')
  .factory('TrajetsService', TrajetsService);