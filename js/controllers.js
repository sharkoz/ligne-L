
/* Controllers */

function HorairesCtrl( $scope, LibGare, DataSource, Param ){
//$scope.dataSet = DataSource.passage;
//console.log($scope.DataSet);

    //This is the callback function
    setData = function(data) {
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);

    $scope.gare = LibGare.values;

    $scope.param = Param.values;
    console.log($scope.param)
}

