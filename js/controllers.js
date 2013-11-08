
/* Controllers */


function AppCtrl( $scope, $localStorage){

    $scope.$storage = $localStorage;
    console.log("Local Storage:")
    console.log($scope.$storage.param)
}

function HorairesCtrl( $scope, LibGare, Param ){

if ($scope.$storage.param===undefined)
{
    $scope.$storage.param = Param.values;
  	console.log("Initiate Local Storage:")
    console.log($scope.param) 

 }
 	$scope.param = $scope.$storage.param;
 	console.log("Libgare :")
    console.log(LibGare.values) 
    $scope.gare = LibGare.values;
    console.log("gare :")
    console.log($scope.gare.value) 

}

function TrajetCtrl( $scope, DataSource ){

    //This is the callback function
    setData = function(data) {
        $scope.dataSet = data.passages;
		console.log("dataSet :");
		console.log($scope.dataSet);
    }
         
    DataSource.get(setData, $scope.trajet.url);

}