
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
	console.log($scope.apiUrl)
}

function HorairesCtrl( $scope, LibGare, Param ){

if ($scope.$storage.param===undefined)
{
    $scope.$storage.param = Param.values;
  	console.log("Initiate Local Storage:")
    console.log($scope.param) 

 }
 	$scope.param = $scope.$storage.param;
 	
    $scope.gare = LibGare.func;
    $scope.ListeGares = LibGare.values;
    console.log("Gare :")
    console.log($scope.gare) 
    console.log("ListeGares :")
    console.log($scope.ListeGares) 

}

function TrajetCtrl( $scope, DataSource ){

    //This is the callback function
    $scope.setData = function(data) {
        $scope.dataSet = data.passages;
		console.log("dataSet : scop "+$scope.$id+".");
		console.log($scope.dataSet);
    }

         console.log($scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);
    $scope.jsoncall = function(){DataSource.get($scope.setData, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart);};

    $scope.jsoncall();

}