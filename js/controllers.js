
/* Controllers */

function HorairesCtrl( $scope, LibGare, Param ){
//$scope.dataSet = DataSource.passage;
//console.log($scope.DataSet);

    $scope.param = Param.values;
    console.log($scope.param) 

 /*   //This is the callback function
    setData = function(data) {
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);
*/
    $scope.gare = LibGare.values;


}

function TrajetCtrl( $scope, DataSource ){
//$scope.dataSet = DataSource.passage;
//console.log($scope.DataSet);
console.log("toto");
    //This is the callback function
    setData = function(data) {
        $scope.dataSet = data;
        console.log($scope.DataSet);
    }
         
    DataSource.get(setData, $scope.trajet.url);



}


