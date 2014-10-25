function InitService ($document, $window, TrajetsService, GeolocService) {
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
		if(InitService.phonegap){
			gaPlugin.trackEvent(null, function(error){console.log(error);}, n1, n2, n3, value);
		}
	}
	InitService.gaTrackPage = function(page){
		if(InitService.phonegap){
			gaPlugin.trackPage(null, function(error){console.log(error);}, page);
		}
	}
	
	InitService.onResume = function(){
		TrajetsService.RefreshAll();
		GeolocService.RefreshLoc();
		InitService.gaPlugin.trackEvent("App", "Refresh", "App refreshed", 1);
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