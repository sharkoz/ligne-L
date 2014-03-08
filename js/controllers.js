
/* Controllers */


function AppCtrl( $scope, $location, $window, $localStorage, $route, Geomath, Locate){
//console.log("Chargement du controller AppCtrl pour "+$scope.$id);
	FastClick.attach(document.body);
	//document.addEventListener("deviceready", onDeviceReady, false);
	//function onDeviceReady() {
	//	document.addEventListener("resume", onResume, false);
	//};
	
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
	};
	
	
	// 1 - Get localstorage
    $scope.$storage = $localStorage;
    ////console.log("Local Storage:")
    ////console.log($scope.$storage.param)

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
	} else {
	    // Web page
		$scope.apiUrl = "../ligne-server/";
	}
	////console.log($scope.apiUrl)

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

    $scope.calculateDistance = function(geo1, geo2){
		//console.log("dist btw :");
		//console.log('https://maps.google.com/?q='+geo1.latitude+','+geo1.longitude);
		//console.log('https://maps.google.com/?q='+geo2.latitude+','+geo2.longitude);
        var dist = Geomath.calculateDistance(geo1, geo2);
		return dist;
    }
	
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
	
	/* TODO: A SUPPRIMER : SLIDER
	//$scope.showOptions = function(){
	$scope.slider = 'slider'+$scope.$id;
	//console.log(document.getElementById($scope.slider));
	//$scope.mySwipe = new Swipe(document.getElementById($scope.slider), {
	$scope.mySwipe = new Swipe(document.getElementById('slider'), {
	startSlide: 1,
	speed: 400,
	continuous: false,
	disableScroll: false,
	stopPropagation: true,
	callback: function(index, elem){},
	transitionEnd: function(index, elem) {if(index!=1){$scope.GlobalOptions=false;$scope.$apply();$scope.mySwipe.slide(1);}}
	});
	//}
	*/
	
  $scope.modalShown = false;
  $scope.toggleModal = function() {
  console.log($route.current.loadedTemplateUrl);
    $scope.modalShown = !$scope.modalShown;
  };
}

function HorairesCtrl( $scope, LibGare, Param){

//console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);

if ($scope.$storage.param===undefined)
{
    $scope.$storage.param = Param.values;
}

    $scope.param = $scope.$storage.param;

    //console.log($scope.param);
 	
    $scope.gare = LibGare.func;
    $scope.ListeGares = LibGare.values;
    $scope.GareLoc = LibGare.gareloc;
    ////console.log("Gare :")
    ////console.log($scope.gare) 
    ////console.log("ListeGares :")
    ////console.log($scope.ListeGares) 

    $scope.addTrajet = function(){
        $scope.param.trajet.push({'depart' : '' , 'arrivee' : '0', 'path' : 'mobil', 'depart_pos':{"latitude" : "80", "longitude" : "80"}});
        setTimeout(window.scrollTo(0,document.body.scrollHeight),500);
    }

}

function TrajetCtrl( $scope, $window, DataSource, Getprevi, $http ){
	//console.log("Chargement du controller TrajetCtrl pour "+$scope.$id);

    $scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);

    $scope.getprevi = Getprevi.get;

	$scope.$on('LocRefreshed', function() {
		$scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);
	});

	$scope.$on('Refresh', function() {
		//console.log('Bcast Refresh on '+$scope.$id);
        // On anime le spin loader
        $scope.jsonloading = "spin_image";
        // Si les prévisions existent, on rafraichit asap
        if ($scope.trajet.save !== undefined) {
            $scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
            // Si rien n'est affiché on affiche les prévisions
            if ($scope.trajet.display === undefined) $scope.trajet.display = $scope.trajet.previ;
            // On affiche ensuite la fusion entre l'affichage précédent (si il y avait du live) et les prévisions
            $scope.trajet.display = merge($scope.trajet.display, $scope.trajet.previ);
        }

        if (new Date().toDateString() == $scope.trajet.savedate) {
            // Si les prévisions sont à jour on récupère juste le live
            $scope.jsoncall();
        }
        else {
            // Si le gtfs n'est pas à jour on le telecharge
            DataSource.get($scope.saveData, $scope.apiUrl + "gtfs/" + $scope.trajet.depart + "/" + $scope.trajet.arrivee);
        }
    /*
      if($scope.trajet.save===undefined)
		{
			//console.log('Aucune donnée en mémoire.');
		}
		else
		{
			$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
			$scope.trajet.display = $scope.trajet.previ;
			//console.log("Données mémorisées chargées controller "+$scope.$id);
			////console.log($scope.trajet.previ);
		}
		$scope.jsoncall();*/
	});
	
	$scope.broadcastRefresh = function () {
		//console.log('BcastRefresh from '+$scope.$id);
		$scope.$parent.$parent.$broadcast('Refresh');
	}
	
	
	// Recherche des gares
	$scope.getLocation = function(){
		if($scope.autoDepart.length > 0){
		$scope.DepartList =  {'name': 'Chargement ...'};
		$scope.autoShow = 1;
		$scope.autoTR3A = ''; 	DataSource.get($scope.refreshDepart, $scope.apiUrl+"autocomplete/"+$scope.autoDepart);
		}
		else{
			$scope.autoShow = 0;
		}
	};
	// Callback
	$scope.refreshDepart = function(data) {
		$scope.DepartList =  data;
		$scope.autoShow = 1;
		$scope.autoTR3A = '';
		//console.log(data);
	}
	
	// Recherche des dessertes
	$scope.getDessertes = function(){
		DataSource.get($scope.refreshDessertes, $scope.apiUrl+"dessertes/"+$scope.$parent.trajet.depart);
	};
	// Callback
	$scope.refreshDessertes = function(data) {
		$scope.ListeDessertes = data;
		//console.log(data);
	}

	$scope.rmTrajet = function(trajet){
		if($window.confirm('Voulez vous supprimer le trajet '+$scope.gare[trajet.depart]+' vers '+$scope.gare[trajet.arrivee]+' ?'))
		{
			$scope.cflip = ''; 
			$scope.$parent.param.trajet.splice($scope.$parent.param.trajet.indexOf(trajet),1); 
			$scope.options=!$scope.options;
		}
	}
	
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
						display[pre].message = "A l'heure";
					}
					else{
						display[pre].message = "+ "+display[pre].delta+"min";
					}
					display[pre].date.mode='R';
					display[pre].date.val=live[liv].date.val;
					display[pre].voie=live[liv].voie;
				}
			}
		}
		return display;
	}

    // Callback fonction pour récupérer les horaires prévisionnels de la gare
    $scope.saveData = function(data) {
        $scope.trajet.save = data.passages;
        $scope.trajet.savedate = new Date().toDateString();
		/*$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
		////console.log($scope.trajet.previ);
		$scope.trajet.display = $scope.trajet.previ;
		if($scope.dataSet!==undefined && $scope.trajet.previ!==undefined){
		    $scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
		}*/
        $scope.jsoncall();
    }

    /*// Fonction pour récupérer les horaires prévisionnels de la gare => Integré au $on.Refresh
    $scope.jsonSave = function() {
        // Updates only once a day
        if (new Date().toDateString() != $scope.trajet.savedate) DataSource.get($scope.saveData, $scope.apiUrl + "gtfs/" + $scope.trajet.depart + "/" + $scope.trajet.arrivee);
    };

    //$scope.jsonSave();

	if($scope.trajet.save===undefined)
	{
		//console.log('Aucune donnée en mémoire.');
	}
	else
	{
		$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
		$scope.trajet.display = $scope.trajet.previ;
	}*/
	
	    // Callback function pour les horaires en live
    $scope.setData = function(data) {
		//console.log('Données temps réel disponibles controller '+$scope.$id);
		$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
		$scope.dataSet = data.passages;
		$scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
		$scope.jsonloading = "";
	}

    $scope.jsoncall = function(){$scope.jsonloading = "spin_image";DataSource.get($scope.setData, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);};

    //$scope.jsoncall();
    $scope.$parent.$broadcast('Refresh');
}




