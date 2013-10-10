
var app = angular.module('lanInfo', ['ngResource']);


app.controller('DispHosts', function($scope, $resource) {


    $scope.hosts = [];
    $scope.loadHosts = function() {
        var $h = $resource('./rest/hosts',{},{'get':{ method: 'GET', isArray: true}});
        var $res = $h.get({},function(){
        console.log($res);
        $scope.hosts = $res;
        });
        //console.log($h);
    };

        $scope.refreshHosts = function() {
        var $h = $resource('./rest/hostsrefresh',{},{'get':{ method: 'GET', isArray: true}});
        var $res = $h.get({},function(){
        console.log($res);
        $scope.refresh = $res;
        $scope.loadHosts();
        });
        //console.log($h);
    };


});



angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(callback){
                $http.get(
                    'data.xml',
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        
                        return json.passages;
                        }
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }]);
     
angular.module('myApp',['myApp.service']);
 
var AppController = function($scope,DataSource) {
    //This is the callback function
    setData = function(data) {
    console.log(data)
        $scope.dataSet = data;
    }
         
    DataSource.get(setData);
     
}





