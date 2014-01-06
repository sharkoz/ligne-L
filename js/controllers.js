
/* Controllers */


function AppCtrl( $scope, $localStorage, $route, Geomath, Locate){
console.log("Chargement du controller AppCtrl pour "+$scope.$id);
	// 1 - Get localstorage
    $scope.$storage = $localStorage;
    //console.log("Local Storage:")
    //console.log($scope.$storage.param)

	if ($scope.$storage.max===undefined)
	{
		$scope.$storage.max = 5;
	}
	$scope.max = $scope.$storage.max;
	
	// 2 - Check if accessed via web or via PhoneGap app and change api URL accordingly
    var nativeapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		$scope.apiUrl = "http://rlier.fr/ligne-server/";
	} else {
	    // Web page
		$scope.apiUrl = "../../ligne-server/";
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
        console.log($scope.pos);
        //$scope.reloadRoute(); //Attention ! Bug !
    }

    $scope.calculateDistance = function(geo1, geo2){
        return Geomath.calculateDistance(geo1, geo2);
    }
	
    $scope.local = function(){
        Locate.doGeolocation($scope.setLoc);
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
    
}

function HorairesCtrl( $scope, LibGare, Param){

console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);

if ($scope.$storage.param===undefined)
{
    $scope.$storage.param = Param.values;
}

    $scope.param = $scope.$storage.param;

    console.log($scope.param);
 	
    $scope.gare = LibGare.func;
    $scope.ListeGares = LibGare.values;
    $scope.GareLoc = LibGare.gareloc;
    //console.log("Gare :")
    //console.log($scope.gare) 
    //console.log("ListeGares :")
    //console.log($scope.ListeGares) 

    $scope.addTrajet = function(){
        $scope.param.trajet.push({'depart' : 'BGV' , 'arrivee' : 'SNB', 'path' : 'mobil'});
        setTimeout(window.scrollTo(0,document.body.scrollHeight),500);
    }

}

function TrajetCtrl( $scope, DataSource, Getprevi, $http ){
	console.log("Chargement du controller TrajetCtrl pour "+$scope.$id);
    //$scope.trajet.dist = $scope.calculateDistance($scope.GareLoc[$scope.trajet.depart],$scope.pos);

	// Recherche des gares
	$scope.getLocation = function(){DataSource.get($scope.refreshDepart, $scope.apiUrl+"autocomplete/"+$scope.autoDepart);};
	// Callback
	$scope.refreshDepart = function(data) {
		$scope.DepartList =  data;
		$scope.autoShow = 1;
		$scope.autoTR3A = '';
		console.log(data);
	}
	
	//Fonction pour merger les temps prévus et les temps réels
	merge = function(live, previ){
		var liv;
		var pre;
		var display = previ;
		for(liv=0; liv<live.length; ++liv){
			for(pre=0; pre<previ.length; ++pre){
				if(live[liv].num == previ[pre].num){
					display[pre].delta=(new Date('1970/01/01 '+previ[pre].date.val+':00')-new Date('1970/01/01 '+live[liv].date.val+':00'))/60000;
					display[pre].date.mode='R';
					display[pre].date.val=live[liv].date.val;
					display[pre].voie=live[liv].voie;
				}
			}
		}
		return display;
	}
	
    //Sauvegarde pour toute la journée
    $scope.saveData = function(data) {
        $scope.trajet.save = data.passages;
		$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
		$scope.trajet.display = $scope.trajet.previ;
		if($scope.dataSet!==undefined){
		$scope.trajet.display = merge($scope.dataSet.train, $scope.previ);
		}//console.log('Horaires prévisionnels chargés.'+$scope.trajet.previ);
        //console.log("dataSet : scop "+$scope.$id+".");
    }

         //console.log($scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);
    $scope.jsonSave = function(){DataSource.get($scope.saveData, $scope.apiUrl+"gtfs/"+$scope.trajet.depart+"/"+$scope.trajet.arrivee);};

    $scope.jsonSave();
	$scope.getprevi = Getprevi.get;
	if($scope.trajet.save===undefined)
	{
		console.log('Aucune donnée en mémoire.');
	}
	else
	{
		$scope.trajet.previ = $scope.getprevi($scope.trajet.save, $scope.max);
		$scope.trajet.display = $scope.trajet.previ;
		console.log("Données mémorisées chargées controller "+$scope.$id);
		//console.log($scope.trajet.previ);
	}
	
	    //This is the callback function
    $scope.setData = function(data) {
		console.log('Données temps réel disponibles controller '+$scope.$id);
        $scope.dataSet = data.passages;
		$scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
    }

         //console.log($scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);
    $scope.jsoncall = function(){DataSource.get($scope.setData, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);};

    $scope.jsoncall();
	
}