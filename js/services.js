app.factory('DataSource', ['$http',function($http){
  return {
    get: function(callback, url){
      $http.get(
      url
      ).success(function(data, status) {
        // send the converted data back
        // to the callback function
        callback(data);
        })
      }
    }
  }])


.service('LibGare', function(){
return { values : [
{"key" : "BGV", "value" : "BOUGIVAL", "latitude" : "48.854223502592255", "longitude" : "2.132240468348696"},
{"key" : "PSL", "value" : "GARE ST LAZARE", "latitude" : "48.87535783596312", "longitude" : "2.3247332774874016"}
],
func : {
'BGV' : 'BOUGIVAL',
'PSL' : 'PARIS SAINT-LAZARE'},
gareloc : {
"BGV" : { "latitude" : 48.8542235, "longitude" : 2.1322404},
"PSL" : { "latitude" : 48.8753578, "longitude" : 2.3247332}}
   } })
         

.service('Param', function(){
  return { 
    values : {trajet : [
	{'depart' : 'BGV' , 'arrivee' : 'PSL', 'path' : 'previ'},
    {'depart' : 'BGV' , 'arrivee' : 'PSL', 'path' : 'live'}
    ]}
  } 
})

.service('InitDB', function(){
 // Populate the database 
    //
    function populateDB(tx) {
         tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }

	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
		
	return db;
})

.service('Geomath', function() {
    var self = this;
    var R = 6371000; // earth's radius in meters

    /**
     * calculate distance
     * @param geo1
     * @param geo2
     * @returns {Number}
     */
    this.calculateDistance = function(geo1, geo2) {
        //self.convertFromGoogle([geo1, geo2]);
        var dLat = self.toRad(geo1.latitude - geo2.latitude);
        var dLon = self.toRad(geo1.longitude - geo2.longitude);
        var lat1 = self.toRad(geo2.latitude);
        var lat2 = self.toRad(geo1.latitude);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return parseInt(R * c);
    }

    /**
     * calculate bearing between two coordinates
     * @param geo1
     * @param geo2
     * @returns {*}
     */
    this.calculateBearing = function(geo1, geo2) {
        self.convertFromGoogle([geo1, geo2]);
        var dLat = self.toRad(geo1.latitude - geo2.latitude);
        var dLon = self.toRad(geo1.longitude - geo2.longitude);
        var lat1 = self.toRad(geo2.latitude);
        var lat2 = self.toRad(geo1.latitude);

        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) -
            Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = self.toDeg(Math.atan2(y, x));
        return brng;
    }

    /**
     * get coords from projecting out from location at a certain distance and angle
     * @param geo
     * @param distance
     * @param bearing
     */
    this.projectOut = function(geo, d, brng) {
        self.convertFromGoogle([geo]);
        var lat1 = self.toRad(geo.latitude);
        var lon1 = self.toRad(geo.longitude);
        var brng = self.toRad(brng);
        var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) +
            Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng) );
        var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1),
            Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

        return { latitude: self.toDeg(lat2), longitude: self.toDeg(lon2) };
    }

    /**
     * convert from google lat/long object
     */
    this.convertFromGoogle = function(llobjs) {
       llobjs.forEach( function(llo) {
           console.log(llo)
           if (llo.nb && llo.ob) {
               llo.latitude = llo.nb;
               llo.longitude = llo.ob;
           }
       });
    }

    /**
     * math util to convert lat/long to radians
     * @param value
     * @returns {number}
     */
    this.toRad = function(value) {
        return value * Math.PI / 180;
    }

    /**
     * math util to convert radians to latlong/degrees
     * @param value
     * @returns {number}
     */
    this.toDeg = function(value) {
        return value * 180 / Math.PI;
    }

})

.service('Locate', function() {
    var self = this;

    this.doGeolocation = function(callback) {
      if (navigator.geolocation) {
        var loc = navigator.geolocation.getCurrentPosition(callback, self.positionError);
      } else {
        positionError(-1);
      }
    }

    this.positionError = function (err) {
      var msg;
      switch(err.code) {
        case err.UNKNOWN_ERROR:
          msg = "Impossible de vous géolocaliser";
          break;
        case err.PERMISSION_DENINED:
          msg = "Permission refusée pour la géolocalisation";
          break;
        case err.POSITION_UNAVAILABLE:
          msg = "Votre position n'est pas disponible";
          break;
        case err.BREAK:
          msg = "La géolocalisation a mis trop de temps";
          break;
        default:
          msg = "Votre appareil ne supporte pas la géolocalisation";
      }
    console.log(msg);
    }

});



