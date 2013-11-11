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
{"key" : "87381657", "value" : "ACHERES VILLE", "latitude" : "48.97009463350331", "longitude" : "2.077399690137432"},
{"key" : "87381137", "value" : "ASNIERES", "latitude" : "48.90577689938711", "longitude" : "2.283322418774437"},
{"key" : "87382002", "value" : "BECON LES BRUYERES", "latitude" : "48.90558058622569", "longitude" : "2.2685717389280286"},
{"key" : "87382440", "value" : "BOUGIVAL", "latitude" : "48.854223502592255", "longitude" : "2.132240468348696"},
{"key" : "87382655", "value" : "CERGY LE HAUT", "latitude" : "49.04853882684085", "longitude" : "2.012273951579774"},
{"key" : "87381905", "value" : "CERGY PREFECTURE", "latitude" : "49.03651798808937", "longitude" : "2.0797172017740872"},
{"key" : "87382499", "value" : "CERGY ST CHRISTOPHE", "latitude" : "49.04970233666653", "longitude" : "2.0344548496859307"},
{"key" : "87382333", "value" : "CHAVILLE RIVE DROITE", "latitude" : "48.81213631204703", "longitude" : "2.187833980943886"},
{"key" : "87381129", "value" : "CLICHY LEVALLOIS", "latitude" : "48.896921474249154", "longitude" : "2.2983799275317622"},
{"key" : "87381459", "value" : "CONFLANS FIN D'OISE", "latitude" : "48.98918486518304", "longitude" : "2.074559115279104"},
{"key" : "87382200", "value" : "COURBEVOIE", "latitude" : "48.89825143608776", "longitude" : "2.2479712985220774"},
{"key" : "87382259", "value" : "GARCHES MARNES LA COQUETTE", "latitude" : "48.8383162045054", "longitude" : "2.186873590102641"},
{"key" : "87386409", "value" : "HOUILLES CARRIERES SUR SEINE", "latitude" : "48.920834402650435", "longitude" : "2.184506653880072"},
{"key" : "87382432", "value" : "LA CELLE ST CLOUD", "latitude" : "48.84254045243452", "longitude" : "2.1379646985022473"},
{"key" : "87382218", "value" : "LA DEFENSE", "latitude" : "48.89348957685005", "longitude" : "2.2382750809435"},
{"key" : "87386003", "value" : "LA GARENNE COLOMBES", "latitude" : "48.90943406515317", "longitude" : "2.2399216021326"},
{"key" : "87382366", "value" : "LE VAL D OR", "latitude" : "48.856909415204285", "longitude" : "2.2167705035156104"},
{"key" : "87386300", "value" : "LES VALLEES", "latitude" : "48.9134465867775", "longitude" : "2.2578577947908056"},
{"key" : "87382473", "value" : "L ETANG LA VILLE", "latitude" : "48.8681535534945", "longitude" : "2.0767934812245623"},
{"key" : "87382457", "value" : "LOUVECIENNES", "latitude" : "48.861055839211225", "longitude" : "2.1230871749462023"},
{"key" : "87386425", "value" : "MAISONS LAFFITTE", "latitude" : "48.94591302974726", "longitude" : "2.144647838942034"},
{"key" : "87382812", "value" : "MAREIL MARLY", "latitude" : "48.88142439621772", "longitude" : "2.0793295016549455"},
{"key" : "87382465", "value" : "MARLY LE ROI", "latitude" : "48.87134983318941", "longitude" : "2.096627657033414"},
{"key" : "87382879", "value" : "MONTREUIL", "latitude" : "48.80671004658759", "longitude" : "2.151246653457707"},
{"key" : "87386318", "value" : "NANTERRE UNIVERSITE", "latitude" : "48.90154759090085", "longitude" : "2.2151672029209086"},
{"key" : "87334482", "value" : "NEUVILLE UNIVERSITE", "latitude" : "49.01411357293612", "longitude" : "2.078886153443222"},
{"key" : "87393876", "value" : "NOISY LE ROI", "latitude" : "48.84156230105542", "longitude" : "2.062030825507402"},
{"key" : "87384008", "value" : "GARE ST LAZARE", "latitude" : "48.87535783596312", "longitude" : "2.3247332774874016"},
{"key" : "87381111", "value" : "PONT CARDINET", "latitude" : "48.887569902627185", "longitude" : "2.3140185319253703"},
{"key" : "87382382", "value" : "PUTEAUX", "latitude" : "48.88349177576891", "longitude" : "2.2335382863034576"},
{"key" : "87382358", "value" : "ST CLOUD", "latitude" : "48.8443540356601", "longitude" : "2.21690859828739"},
{"key" : "87366922", "value" : "ST GERMAIN BEL AIR FOURQUEUX", "latitude" : "48.89502386580339", "longitude" : "2.071942361575941"},
{"key" : "87382804", "value" : "ST GERMAIN GRANDE CEINTURE", "latitude" : "48.90318684873618", "longitude" : "2.073127482840841"},
{"key" : "87382481", "value" : "ST NOM LA BRETECHE FORET DE MARLY", "latitude" : "48.86789653328583", "longitude" : "2.0509516569611454"},
{"key" : "87386417", "value" : "SARTROUVILLE", "latitude" : "48.937772615852204", "longitude" : "2.1572146480886265"},
{"key" : "87382341", "value" : "SEVRES VILLE D AVRAY", "latitude" : "48.82742173247642", "longitude" : "2.200558462341459"},
{"key" : "87382374", "value" : "SURESNES MONT VALERIEN", "latitude" : "48.87170696288582", "longitude" : "2.221109449053621"},
{"key" : "87382267", "value" : "VAUCRESSON", "latitude" : "48.83678496196323", "longitude" : "2.1525547902775947"},
{"key" : "87382861", "value" : "VERSAILLES RIVE DROITE", "latitude" : "48.80961433418492", "longitude" : "2.135451182897089"},
{"key" : "87382887", "value" : "VIROFLAY RIVE DROITE", "latitude" : "48.80563005715639", "longitude" : "2.1683542240880835"},
],
func : {'87381657' : 'ACHERES VILLE',
'87381137' : 'ASNIERES SUR SEINE',
'87382002' : 'BECON LES BRUYERES',
'87382440' : 'BOUGIVAL',
'87382655' : 'CERGY LE HAUT',
'87381905' : 'CERGY PREFECTURE',
'87382499' : 'CERGY SAINT-CHRISTOPHE',
'87382333' : 'CHAVILLE RIVE DROITE',
'87381129' : 'CLICHY LEVALLOIS',
'87381459' : 'CONFLANS FIN D\'OISE',
'87382200' : 'COURBEVOIE',
'87382259' : 'GARCHES MARNES LA COQUETTE',
'87386409' : 'HOUILLES CARRIERES SUR SEINE',
'87382432' : 'LA CELLE SAINT-CLOUD',
'87382218' : 'LA DEFENSE',
'87386003' : 'LA GARENNE COLOMBES',
'87382366' : 'LE VAL D\'OR',
'87386300' : 'LES VALLEES',
'87382473' : 'L\'ETANG LA VILLE',
'87382457' : 'LOUVECIENNES',
'87386425' : 'MAISONS LAFFITTE',
'87382812' : 'MAREIL MARLY',
'87382465' : 'MARLY LE ROI',
'87382879' : 'MONTREUIL',
'87386318' : 'NANTERRE UNIVERSITE',
'87334482' : 'NEUVILLE UNIVERSITE',
'87393876' : 'NOISY LE ROI',
'87384008' : 'PARIS SAINT-LAZARE',
'87381111' : 'PONT CARDINET',
'87382382' : 'PUTEAUX',
'87382358' : 'SAINT-CLOUD',
'87366922' : 'ST-GERMAIN BEL AIR FOURQUEUX',
'87382804' : 'ST-GERMAIN GRANDE CEINTURE',
'87382481' : 'ST-NOM LA BRETECHE',
'87386417' : 'SARTROUVILLE',
'87382341' : 'SEVRES VILLE D\'AVRAY',
'87382374' : 'SURESNES MONT VALERIEN',
'87382267' : 'VAUCRESSON',
'87382861' : 'VERSAILLES RIVE DROITE',
'87382887' : 'VIROFLAY RIVE DROITE'},
gareloc : {
"87381657" : { "latitude" : 48.9700946, "longitude" : 2.0773996},
"87381137" : { "latitude" : 48.9057768, "longitude" : 2.2833224},
"87382002" : { "latitude" : 48.9055805, "longitude" : 2.2685717},
"87382440" : { "latitude" : 48.8542235, "longitude" : 2.1322404},
"87382655" : { "latitude" : 49.0485388, "longitude" : 2.0122739},
"87381905" : { "latitude" : 49.0365179, "longitude" : 2.0797172},
"87382499" : { "latitude" : 49.0497023, "longitude" : 2.0344548},
"87382333" : { "latitude" : 48.8121363, "longitude" : 2.1878339},
"87381129" : { "latitude" : 48.8969214, "longitude" : 2.2983799},
"87381459" : { "latitude" : 48.9891848, "longitude" : 2.0745591},
"87382200" : { "latitude" : 48.8982514, "longitude" : 2.2479712},
"87382259" : { "latitude" : 48.8383162, "longitude" : 2.1868735},
"87386409" : { "latitude" : 48.9208344, "longitude" : 2.1845066},
"87382432" : { "latitude" : 48.8425404, "longitude" : 2.1379646},
"87382218" : { "latitude" : 48.8934895, "longitude" : 2.2382750},
"87386003" : { "latitude" : 48.9094340, "longitude" : 2.2399216},
"87382366" : { "latitude" : 48.8569094, "longitude" : 2.2167705},
"87386300" : { "latitude" : 48.9134465, "longitude" : 2.2578577},
"87382473" : { "latitude" : 48.8681535, "longitude" : 2.0767934},
"87382457" : { "latitude" : 48.8610558, "longitude" : 2.1230871},
"87386425" : { "latitude" : 48.9459130, "longitude" : 2.1446478},
"87382812" : { "latitude" : 48.8814243, "longitude" : 2.0793295},
"87382465" : { "latitude" : 48.8713498, "longitude" : 2.0966276},
"87382879" : { "latitude" : 48.8067100, "longitude" : 2.1512466},
"87386318" : { "latitude" : 48.9015475, "longitude" : 2.2151672},
"87334482" : { "latitude" : 49.0141135, "longitude" : 2.0788861},
"87393876" : { "latitude" : 48.8415623, "longitude" : 2.0620308},
"87384008" : { "latitude" : 48.8753578, "longitude" : 2.3247332},
"87381111" : { "latitude" : 48.8875699, "longitude" : 2.3140185},
"87382382" : { "latitude" : 48.8834917, "longitude" : 2.2335382},
"87382358" : { "latitude" : 48.8443540, "longitude" : 2.2169085},
"87366922" : { "latitude" : 48.8950238, "longitude" : 2.0719423},
"87382804" : { "latitude" : 48.9031868, "longitude" : 2.0731274},
"87382481" : { "latitude" : 48.8678965, "longitude" : 2.0509516},
"87386417" : { "latitude" : 48.9377726, "longitude" : 2.1572146},
"87382341" : { "latitude" : 48.8274217, "longitude" : 2.2005584},
"87382374" : { "latitude" : 48.8717069, "longitude" : 2.2211094},
"87382267" : { "latitude" : 48.8367849, "longitude" : 2.1525547},
"87382861" : { "latitude" : 48.8096143, "longitude" : 2.1354511},
"87382887" : { "latitude" : 48.8056300, "longitude" : 2.1683542}}
   } })
         

.service('Param', function(){
  return { 
    values : {trajet : [
	{'depart' : '87382440' , 'arrivee' : '87384008', 'path' : 'previ'},
    {'depart' : '87382440' , 'arrivee' : '87384008', 'path' : 'live'}
    ]}
  } 
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



