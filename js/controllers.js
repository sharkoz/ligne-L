
/* Controllers */

function HorairesCtrl( $scope, LibGare, Param ){

    $scope.param = Param.values;
    console.log($scope.param) 

    $scope.gare = LibGare.values;

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