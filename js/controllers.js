
/* Controllers */


function AppCtrl( $scope, $localStorage){

    $scope.$storage = $localStorage;
    console.log("Local Storage:")
    console.log($scope.$storage.param)

    var nativeapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( nativeapp ) {
	    // PhoneGap application
		$scope.apiUrl = "http://rlier.fr/ligne-server/";
	} else {
	    // Web page
		$scope.apiUrl = "../ligne-server/";
	}
	//console.log($scope.apiUrl)
}

function HorairesCtrl( $scope, LibGare, Param, Geomath, Locate ){

    $scope.setLoc = function(position) {
      var coords = position.coords || position.coordinate || position;
      $scope.localise = true;
      $scope.pos= {'latitude' : coords.latitude, 'longitude' : coords.longitude};
      $scope.$storage.pos = $scope.pos;
        console.log($scope.pos);
        //console.log($scope.dataSet);

        //for (var i=0;i<$scope.param.trajet.length;i++)
        //{
        //    console.log($scope.GareLoc[$scope.param.trajet[i].depart]);
        //    $scope.param.trajet[i].dist = Geomath.calculateDistance($scope.GareLoc[$scope.param.trajet[i].depart],$scope.pos);
        //    console.log($scope.param.trajet[i].dist);
        //}
    }

if ($scope.$storage.param===undefined)
{
    $scope.$storage.param = Param.values;
  	//console.log("Initiate Local Storage:")
    //console.log($scope.param) 
}
 	$scope.localise = false;
    $scope.param = $scope.$storage.param;
    $scope.pos = $scope.$storage.pos;
    console.log($scope.param);
 	
    $scope.locate = Locate;
    $scope.calculateDistance = function(geo1, geo2){
        return Geomath.calculateDistance(geo1, geo2);
    }
    $scope.local = Locate.doGeolocation($scope.setLoc);

    $scope.gare = LibGare.func;
    $scope.ListeGares = LibGare.values;
    $scope.GareLoc = LibGare.gareloc;
    //console.log("Gare :")
    //console.log($scope.gare) 
    //console.log("ListeGares :")
    //console.log($scope.ListeGares) 

}

function TrajetCtrl( $scope, DataSource ){

    //This is the callback function
    $scope.setData = function(data) {
        $scope.dataSet = data.passages;
		//console.log("dataSet : scop "+$scope.$id+".");
		console.log($scope.dataSet);
    }

         //console.log($scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);
    $scope.jsoncall = function(){DataSource.get($scope.setData, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);};

    $scope.jsoncall();

}