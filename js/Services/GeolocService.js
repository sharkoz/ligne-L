function GeolocService ($localStorage, Geomath, Locate, LIB_GARE) {
	var GeolocService = {};
	
  setLoc = function(position) {
    var coords = position.coords || position.coordinate || position;
   	$localStorage.pos= {'latitude' : coords.latitude, 'longitude' : coords.longitude};
  };

	GeolocService.RefreshLoc = function(){
	  if(!$localStorage.nogeoloc){
	      Locate.doGeolocation(setLoc);
	  }
  }

  GeolocService.calculateDistance = function(geo1, geo2){
    	geo2 = geo2 || $localStorage.pos;
    	var dist = Geomath.calculateDistance(geo1, geo2);
		return dist;
  };

  GeolocService.calculateDistanceGare = function(idGare){
    var dist;
    geo1 = gareLocation(idGare);
    if($localStorage.pos !== undefined && !$localStorage.nogeoloc){
    	var dist = GeolocService.calculateDistance(geo1);
    }
    return dist;
  };

  gareLocation = function(idGare){
    var loc = {};
    gare = _.find(LIB_GARE, function (item) {
        return item.code == idGare;
      })
    loc.latitude = gare.latitude;
    loc.longitude = gare.longitude;
    return loc;
	}

	return GeolocService;
}
angular
  .module('ligneL')
  .factory('GeolocService', GeolocService);



app.service('Geomath', function() {
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
           //console.log(llo)
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
	
	    this.doGeolocation = function(callback) {
      if (navigator.geolocation) {
	  console.log('Localisation supportée');
        var loc = navigator.geolocation.getCurrentPosition(callback, self.positionError);
      } else {
        self.positionError(-1);
      }
    }

});