function InitService ($document, $window, $localStorage, ApiService, GeolocService) {
	var InitService = {};
	
	// Vérif pour appli ou site web
	var nativeapp = $document[0].URL.indexOf( 'http://' ) === -1 && $document[0].URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		InitService.apiUrl = "http://nexttrain.fr/api/";
		InitService.phonegap = true;		
	} else {
	    // Web page
        if($document[0].URL.indexOf( 'localhost' ) !== -1) {
			InitService.apiUrl = "http://nexttrain.fr/api/";
            }
	    else {
			InitService.apiUrl = "../ligne-server/";	
        }
	}

	$localStorage.apiUrl = InitService.apiUrl;
  
	// Analytics
	if(InitService.phonegap){
		gaPlugin = $window[0].plugins.gaPlugin;
		gaPlugin.init(successHandler, errorHandler, "UA-45793940-1", 10);
	}
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
	
   GtfsDate = function(){
      ApiService.getLastRefresh()
        .then(function(data) {
          refreshGtfsDate(data);
        })
        .catch(function(error) {
          console.log(error);
        });
   };
   refreshGtfsDate = function(data) {
       $localStorage.saveGtfs_refresh = data;
       //console.log("refreshdate : "+data);
   }

   	migreTrajetV2= function(trajet){
   		depart=trajet.depart;
   		arrivee=trajet.arrivee || '0';
   		if(_.isEmpty($localStorage.favoris)){
			idTrajet = 0;
		}
		else{
			idTrajet = _.max($localStorage.favoris, function(fav){return fav.idTrajet;}).idTrajet+1;			
		}
        $localStorage.favoris.push ({'idTrajet' : idTrajet, 'depart' : depart, 'arrivee' : arrivee, 'is_ar' : false, 'distance': 0, 'aller': true});
        $localStorage.saveGtfs[idTrajet] = {};
        $localStorage.saveGtfs[idTrajet].savedate="0";
    }

   migrationV2 = function(){
   	if($localStorage.favoris===undefined && $localStorage.param!==undefined){
   		// Migration des trajets
   		$localStorage.favoris=[];
   		_.forEach($localStorage.param.trajet,migreTrajetV2);
   	}
   }

       // Function to clear the local storage
	InitService.purgeStorage = function() {
		if($window.confirm("Voulez vous réinitialiser l'application ? Toutes vos gares favorites et vos paramètres seront perdus.")) {
			$localStorage.$reset();
			$localStorage.max = 5;
			$localStorage.saveGtfs_refresh = "1405015264";
		};
	};

	// Fonction d'initialisation
	InitService.init = function(){

		// Variables du localstorage
		if ($localStorage.saveGtfs_refresh===undefined) {
        	$localStorage.saveGtfs_refresh = "1405015264";
    	}
    	if ($localStorage.max===undefined){
			$localStorage.max = 5;
		}

		if ($localStorage.saveGtfs===undefined){
			$localStorage.saveGtfs = {};
		}

		migrationV2();

		if ($localStorage.favoris===undefined){
			$localStorage.favoris = [];
		}

		GeolocService.RefreshLoc();

		GtfsDate(); // Date de dernière MaJ des données du serveur

		InitService.gaTrackPage("App", "Open", "App opened", 1);
		InitService.gaTrackPage("Accueil");
		

    }

	return InitService;
}
angular
  .module('ligneL')
  .factory('InitService', InitService);