function GeolocService ($localStorage) {
	var GeolocService = {};
	
	GeolocService.local  = function(){
	    if($localStorage.nogeoloc){}
	    else{
			$scope.gpsloading = "spin_image";
			//console.log($scope.gpsloading);
	        //console.log($scope.$id);
	        Locate.doGeolocation($scope.setLoc);
	    }
    }
	
	// At init, coordinates are not refreshed
    GeolocService.localise = false;
	if ($localStorage.pos===undefined)
	{
		$localStorage.pos = { "latitude" : 48.8753578, "longitude" : 2.3247332};
	}

	// Refresh coordinates
    $scope.local();

	return GeolocService;
}
angular
  .module('ligne-L')
  .factory('GeolocService', GeolocService);