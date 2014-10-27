function InitService ($document, $window, $locastorage, ApiService, TrajetsService, GeolocService) {
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

	
   GtfsDate = function(){
      ApiService.getLastRefresh()
        .then(function(data) {
          $scope.refreshGtfsDate(data);
        })
        .catch(function(error) {
          $scope.refreshDessertesError(error);
        });
   };
   refreshGtfsDate = function(data) {
       $localstorage.gtfs_refresh = data;
       //console.log("refreshdate : "+data);
   }

       // Function to clear the local storage
	InitService.purgeStorage = function() {
		if($window.confirm("Voulez vous réinitialiser l'application ? Toutes vos gares favorites et vos paramètres seront perdus.")) {
			$localstorage.$reset();
			$localstorage.max = 5;
			$localstorage.gtfs_refresh = "1405015264";
		};
	};

	// Fonction d'initialisation
	InitService.init = function(){

		// Variables du localstorage
		if ($locastorage.gtfs_refresh===undefined) {
        	$localstorage.gtfs_refresh = "1405015264";
    	}
    	if ($locastorage.max===undefined){
			$locastorage.max = 5;
		}
		
		// Initialiser l'affichage des trains
		TrajetsService.RefreshAll();

		GtfsDate(); // Date de dernière MaJ des données du serveur

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