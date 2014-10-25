function InitService ($document, $window) {
	var InitService = {};
	
	// Vérif pour appli ou site web
	var nativeapp = $document.URL.indexOf( 'http://' ) === -1 && $document.URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		InitService.apiUrl = "http://nexttrain.fr/api/";
		InitService.phonegap = true;		
	} else {
	    // Web page
        if($document.URL.indexOf( 'localhost' ) !== -1) {
			InitService.apiUrl = "http://nexttrain.fr/api/";
            }
	    else {
			InitService.apiUrl = "../ligne-server/";	
        }
	}
  
	// Analytics
	var gaPlugin = $window.plugins.gaPlugin;
	gaPlugin.init(successHandler, errorHandler, "UA-45793940-1", 10);
	InitService.gaTrackEvent = function(n1, n2, n3, value){
		gaPlugin.trackEvent(null, function(error){console.log(error);}, n1, n2, n3, value);
	}
	InitService.gaTrackPage = function(page){
		gaPlugin.trackPage(null, function(error){console.log(error);}, page);
	}
	
	InitService.onResume = function(){
		$scope.$broadcast('Refresh');
        $scope.jsnow=Date.now();
		$scope.local();
		if ($scope.phonegap) {$scope.gaPlugin.trackEvent(successHandler, errorHandler, "App", "Refresh", "App refreshed", 1);};
	};
	
	// Fonction d'initialisation
	InitService.init = function(){
		InitService.gaTrackPage("App", "Open", "App opened", 1);
		InitService.gaTrackPage("Accueil");
		
		// Phonegap event listener
		$document.addEventListener("resume", InitService.onResume, false);
		// Desktop event listener
		$window.onfocus = function() {
			InitService.onResume();
		};
    }

	return InitService;
}
angular
  .module('ligne-L')
  .factory('InitService', InitService);