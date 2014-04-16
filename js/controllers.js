
/* Controllers */


function AppCtrl( $scope, $location, $window, $localStorage, $route, Geomath, Locate, LibGare, DataSource){
//console.log("Chargement du controller AppCtrl pour "+$scope.$id);
	FastClick.attach(document.body);
	
	// Commenter pour passer en prod
	//$scope.debug = true;

	/**
	* Debugging Tools
	*
	* Allows you to execute debug functions from the view
	*/
	$scope.log = function(variable) {
		console.log(variable);
	};
	$scope.alert = function(text) {
		alert(text);
	};


    /** Fonctions pour le tracking google analytics */
	function analytics() {
       // alert('loading analytics');
    var gaPlugin;
    gaPlugin = window.plugins.gaPlugin;
    //    gaPlugin.init(successHandler, errorHandler, "UA-45793940-1", 10);
    //    gaPlugin.trackEvent(successHandler, errorHandler, "App", "Open", "App opened", 1);
	$scope.gaPlugin = gaPlugin;
    $scope.gaPlugin.init(successHandler, errorHandler, "UA-45793940-1", 10);
	$scope.gaPlugin.trackEvent(successHandler, errorHandler, "App", "Open", "App opened", 1);
	$scope.gaPlugin.trackPage(successHandler, errorHandler, 'Accueil');
	};

    // Fonctions succes et erreur pour le plugin analytics
    function successHandler(result) {
        //alert('anaytics success : '+result);
    };
    function errorHandler(error) {
        //alert('anaytics error : '+error);
    };

    /** Lancer les analytics après le deviceReady */
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		analytics();
	//	document.addEventListener("resume", onResume, false);
	};
	
	// Phonegap event listener
	document.addEventListener("resume", onResume, false);
	// Desktop event listener
	window.onfocus = function() {
		onResume();
	};
	
	//document.addEventListener("menubutton", $scope.toggleModal, false);
	//document.addEventListener("menubutton", $scope.toggleModal, true);
	
	function onResume(){
		$scope.$broadcast('Refresh');
		$scope.local();
		if ($scope.phonegap) {$scope.gaPlugin.trackEvent(successHandler, errorHandler, "App", "Refresh", "App refreshed", 1);};
	};


    $scope.$on('$routeChangeSuccess', function(event, next, current) {
		// Cacher le menu
		$scope.modalShown=false;
		$scope.route = next.route;
		if ($scope.phonegap) {$scope.gaPlugin.trackPage(successHandler, errorHandler, $scope.route);};
	});


	
	
	// 1 - Get localstorage
    $scope.$storage = $localStorage;

	if ($scope.$storage.max===undefined)
	{
		$scope.$storage.max = 5;
	}
	$scope.max = 15; //$scope.$storage.max;
	
	// 2 - Check if accessed via web or via PhoneGap app and change api URL accordingly
    var nativeapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		$scope.apiUrl = "http://rlier.fr/ligne-server/";
		$scope.phonegap = true;		
	} else {
	    // Web page
		$scope.apiUrl = "../ligne-server/";	
	}
	//console.log($scope.apiUrl)

    $scope.reloadRoute = function () {
        $route.reload();
    };

    $scope.setLoc = function(position) {
      var coords = position.coords || position.coordinate || position;
      $scope.localise = true;
      $scope.pos= {'latitude' : coords.latitude, 'longitude' : coords.longitude};
      $scope.$storage.pos = $scope.pos;
	  $scope.$broadcast('LocRefreshed');
	  $scope.gpsloading = "";
		//console.log($scope.gpsloading);
        //console.log($scope.$id);
		$scope.$apply();
		//console.log('https://maps.google.com/?q='+$scope.pos.latitude+','+$scope.pos.longitude)
        //$scope.reloadRoute(); //Attention ! Bug !
    }

    // Calculate distance btw 2 positions
    $scope.calculateDistance = function(geo1, geo2){
		//console.log("dist btw :");
		//console.log('https://maps.google.com/?q='+geo1.latitude+','+geo1.longitude);
		//console.log('https://maps.google.com/?q='+geo2.latitude+','+geo2.longitude);
        var dist = Geomath.calculateDistance(geo1, geo2);
		return dist;
    }

    // User friendly display of distances
	$scope.distDisplay=function(dist){
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
	}

    // Geolocate the user
    $scope.local = function(){
    if($scope.$storage.nogeoloc){}
    else{
		$scope.gpsloading = "spin_image";
		//console.log($scope.gpsloading);
        //console.log($scope.$id);
        Locate.doGeolocation($scope.setLoc);
    }
    }
	
	// At init, coordinates are not refreshed
    $scope.localise = false;
	if ($scope.$storage.pos===undefined)
	{
		$scope.$storage.pos = { "latitude" : 48.8753578, "longitude" : 2.3247332};
	}
    $scope.pos = $scope.$storage.pos;
    //$scope.locate = Locate;
	
	// Refresh coordinates
    $scope.local();
    
	$scope.hideOptions = function(index) {
		$scope.GlobalOptions = false;
		//$scope.GlobalOptions = ! $scope.GlobalOptions;
		$scope.$apply();
	}

    // Function to clear the local storage
	$scope.purge = function() {
		if($window.confirm("Voulez vous réinitialiser l'application ? Toutes vos gares favorites et vos paramètres seront perdus.")) {
			$scope.$storage.$reset();
			$scope.$storage.max = 5;
		};
	};

    /** Gestion des Modals */
    // Modal du menu caché par défaut
    $scope.modalShown = false;
    // Fonction pour toggle l'affichage du Modal du menu
    $scope.toggleModal = function() {
    //console.log($route.current.loadedTemplateUrl);
      $scope.modalShown = !$scope.modalShown;
    };

    // Modal de détail du train caché par défaut
  	$scope.modal = false;
    // Fonction pour toggle l'affichage du Modal de détail du train
  	$scope.newModal = function(train, dest) {
  		$scope.modal = true;
  		$scope.train = train;
        $scope.dest = dest;
        // get détail
        $scope.detailloading = "loading";
        DataSource.get($scope.getDetail,$scope.getDetailError, $scope.apiUrl + "detail/" + $scope.train.longnum);
  	};
    // Ajout de la transco des gares pour le modal
    $scope.gare = LibGare.func;

    $scope.getDetail = function(data){
        //console.log('Données temps réel disponibles controller '+$scope.$id);
        $scope.detail = data;
        $scope.detailloading = "";
    }
    $scope.getDetailError = function(err){
        console.log("Erreur recuperation des horaires en live");
        $scope.detailloading = "";
    }


      /** Fin gestion des Modals */
}

function HorairesCtrl( $scope, LibGare, Param){
//console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);
    if ($scope.$storage.param===undefined) {
        $scope.$storage.param = Param.values;
    }
    $scope.param = $scope.$storage.param;
    $scope.gare = LibGare.func;
    $scope.ListeGares = LibGare.values;
    $scope.GareLoc = LibGare.gareloc;

    $scope.addTrajet = function(){
        $scope.param.trajet.push({'depart' : '' , 'arrivee' : '0', 'path' : 'mobil', 'depart_pos':$scope.$parent.pos});
    }
}

function TrajetCtrl( $scope, $window, DataSource, Getprevi ){
	//console.log("Chargement du controller TrajetCtrl pour "+$scope.$id);

    $scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);
	$scope.$on('LocRefreshed', function() {
		$scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);
	});

    $scope.getprevi = Getprevi.get;

	$scope.$on('Refresh', function() {
        // On anime le spin loader
        $scope.jsonloading = "spin_image";
        // Si les prévisions existent, on rafraichit asap
        if ($scope.trajet.save !== undefined) {
            $scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
            // Si aucun live n'est dispo on affiche les prévisions, sinon on
            if($scope.dataSet === undefined) {
                $scope.trajet.display = $scope.trajet.previ;
            }
            else {
                $scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
            }
        }
        if (new Date().toDateString() == $scope.trajet.savedate) {
            // Si les prévisions sont à jour on récupère juste le live
            $scope.jsoncall();
        }
        else {
            // Si le gtfs n'est pas à jour on le telecharge
            DataSource.get($scope.saveData,$scope.saveDataError, $scope.apiUrl + "gtfs/" + $scope.trajet.depart + "/" + $scope.trajet.arrivee);
        }
	});

    //Fonction pour merger les temps prévus et les temps réels
    merge = function(live, previ) {
        var liv;
        var pre;
        var display;
        display = angular.copy(previ);
        for(liv=0; liv<live.length; ++liv){
            for(pre=0; pre<previ.length; ++pre){
                if(live[liv].num == previ[pre].num){
                    display[pre].delta=(new Date('1970/01/01 '+previ[pre].date.val+':00')-new Date('1970/01/01 '+live[liv].date.val+':00'))/(-60000);
                    if(display[pre].delta == "0"){
                        display[pre].message = "OK";
                    }
                    else{
                        display[pre].message = live[liv].date.val;
                    }
                    display[pre].date.mode='R';
                    display[pre].date.reel=live[liv].date.val;
					display[pre].date.jsdate=live[liv].date.jsdate;
                    display[pre].voie=live[liv].voie;
					if(live[liv].voie=='BL') {display[pre].voie='?';}
                    display[pre].ligne=live[liv].ligne;
                }
            }
        }
        return display;
    }

    // Callback fonction pour récupérer les horaires prévisionnels de la gare
    $scope.saveData = function(data) {
        $scope.trajet.save = data.passages;
        $scope.trajet.savedate = new Date().toDateString();
        // Une fois que les horaires prévisionnels sont récupérés on récupère les horaires en temps réel
        $scope.jsoncall();
    }
    $scope.saveDataError = function(data) {
        console.log(data);
        $scope.jsonloading = "";
    }

    // Callback function pour les horaires en live
    $scope.setData = function(data) {
        //console.log('Données temps réel disponibles controller '+$scope.$id);
        $scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
        $scope.dataSet = data.passages;
        $scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
        $scope.jsonloading = "";
    }
    $scope.setDataError = function(data) {
        console.log("Erreur recuperation des horaires en live");
        $scope.jsonloading = "";
    }

    $scope.jsoncall = function(){$scope.jsonloading = "spin_image";DataSource.get($scope.setData,$scope.setDataError, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart+"/"+$scope.trajet.arrivee);};

    //Chaque trajet se rafraichit lui même
    $scope.$parent.$broadcast('Refresh');

	// Rafraichir tous les trajets
	$scope.broadcastRefresh = function () {
		$scope.$parent.$parent.$broadcast('Refresh');
	}

    // Supprimer un trajet
	$scope.rmTrajet = function(trajet){
		if($window.confirm('Voulez vous supprimer le trajet '+$scope.gare[trajet.depart]+' vers '+$scope.gare[trajet.arrivee]+' ?'))
		{
			$scope.cflip = ''; 
			$scope.$parent.param.trajet.splice($scope.$parent.param.trajet.indexOf(trajet),1); 
			$scope.options=!$scope.options;
		}
	}
}



function TrajetModif( $scope, $window, DataSource ){
   // Recherche des gares
   $scope.getLocation = function(){
       if($scope.autoDepart.length > 0){
           $scope.DepartList =  {'name': 'Chargement ...'};
           $scope.autoShow = 1;
           $scope.autoTR3A = '';
           DataSource.get($scope.refreshDepart,$scope.refreshDepartError, $scope.apiUrl+"autocomplete/"+$scope.autoDepart);
       }
       else{
           $scope.autoShow = 0;
       }
   };
   // Callback recherche de gares
   $scope.refreshDepart = function(data) {
       $scope.DepartList =  data;
       $scope.autoShow = 1;
       $scope.autoTR3A = '';
       //$scope.trajet = '';
       //$scope.trajet.push({'depart' : '' , 'arrivee' : '0', 'path' : 'mobil', 'depart_pos':$scope.$parent.pos});
   }
   $scope.refreshDepartError = function(data) {
       $scope.autoShow = 0;
       //$scope.autoTR3A = '';
   }

   // Recherche des dessertes
   $scope.getDessertes = function(){
       DataSource.get($scope.refreshDessertes,$scope.refreshDessertesError, $scope.apiUrl+"dessertes/"+$scope.trajet.depart);
   };
   // Callback dessertes
   $scope.refreshDessertes = function(data) {
       $scope.ListeDessertes = data;
       //console.log(data);
   }
   $scope.refreshDessertesError = function(data) {
       console.log(data);
   }

    // Rafraichir tous les trajets
    $scope.broadcastRefresh = function () {
        $scope.$parent.$parent.$broadcast('Refresh');
    }

    // Supprimer un trajet
    $scope.rmTrajet = function(trajet){
        if($window.confirm('Voulez vous supprimer le trajet '+$scope.gare[trajet.depart]+' vers '+$scope.gare[trajet.arrivee]+' ?'))
        {
            $scope.cflip = '';
            $scope.$parent.param.trajet.splice($scope.$parent.param.trajet.indexOf(trajet),1);
            $scope.options=!$scope.options;
            if ($scope.phonegap) {$scope.gaPlugin.trackEvent(successHandler, errorHandler, "Trajet", "Delete", "Delete", 1);};
        }
    }
}