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
{"key" : '87381657', "value" : 'ACHERES VILLE'},
{"key" : '87381137', "value" : 'ASNIERES SUR SEINE'},
{"key" : '87382002', "value" : 'BECON LES BRUYERES'},
{"key" : '87382440', "value" : 'BOUGIVAL'},
{"key" : '87382655', "value" : 'CERGY LE HAUT'},
{"key" : '87381905', "value" : 'CERGY PREFECTURE'},
{"key" : '87382499', "value" : 'CERGY SAINT-CHRISTOPHE'},
{"key" : '87382333', "value" : 'CHAVILLE RIVE DROITE'},
{"key" : '87381129', "value" : 'CLICHY LEVALLOIS'},
{"key" : '87381459', "value" : 'CONFLANS FIN D\'OISE'},
{"key" : '87382200', "value" : 'COURBEVOIE'},
{"key" : '87382259', "value" : 'GARCHES MARNES LA COQUETTE'},
{"key" : '87386409', "value" : 'HOUILLES CARRIERES SUR SEINE'},
{"key" : '87382432', "value" : 'LA CELLE SAINT-CLOUD'},
{"key" : '87382218', "value" : 'LA DEFENSE'},
{"key" : '87386003', "value" : 'LA GARENNE COLOMBES'},
{"key" : '87382366', "value" : 'LE VAL D\'OR'},
{"key" : '87386300', "value" : 'LES VALLEES'},
{"key" : '87382473', "value" : 'L\'ETANG LA VILLE'},
{"key" : '87382457', "value" : 'LOUVECIENNES'},
{"key" : '87386425', "value" : 'MAISONS LAFFITTE'},
{"key" : '87382812', "value" : 'MAREIL MARLY'},
{"key" : '87382465', "value" : 'MARLY LE ROI'},
{"key" : '87382879', "value" : 'MONTREUIL'},
{"key" : '87386318', "value" : 'NANTERRE UNIVERSITE'},
{"key" : '87334482', "value" : 'NEUVILLE UNIVERSITE'},
{"key" : '87393876', "value" : 'NOISY LE ROI'},
{"key" : '87384008', "value" : 'PARIS SAINT-LAZARE'},
{"key" : '87381111', "value" : 'PONT CARDINET'},
{"key" : '87382382', "value" : 'PUTEAUX'},
{"key" : '87382358', "value" : 'SAINT-CLOUD'},
{"key" : '87366922', "value" : 'SAINT-GERMAIN EN LAYE BEL AIR FOURQUEUX'},
{"key" : '87382804', "value" : 'SAINT-GERMAIN EN LAYE GRANDE CEINTURE'},
{"key" : '87382481', "value" : 'SAINT-NOM LA BRETECHE FORET DE MARLY'},
{"key" : '87386417', "value" : 'SARTROUVILLE'},
{"key" : '87382341', "value" : 'SEVRES VILLE D\'AVRAY'},
{"key" : '87382374', "value" : 'SURESNES MONT VALERIEN'},
{"key" : '87382267', "value" : 'VAUCRESSON'},
{"key" : '87382861', "value" : 'VERSAILLES RIVE DROITE'},
{"key" : '87382887', "value" : 'VIROFLAY RIVE DROITE'}]
   } })
         

.service('Param', function(){
  return { 
    values : {trajet : [
	{'depart' : '87382440' , 'arrivee' : '87384008', 'url' : 'http://rlier.fr/ligne-server/live/87382440/87384008'},
    {'depart' : '87382440' , 'arrivee' : '87384008', 'url' : '../ligne-server/live/87382440/87384008'},
	{'depart' : '87384008' , 'arrivee' : '87382440', 'url' : 'http://rlier.fr/ligne-server/live/87384008/87382440'},
    {'depart' : '87384008' , 'arrivee' : '87382440', 'url' : '../ligne-server/live/87384008/87382440'},
    {'depart' : '87382440' , 'arrivee' : '', 'url' : 'http://rlier.fr/ligne-server/previ/87382440'},
    {'depart' : '87382440' , 'arrivee' : '', 'url' : '../ligne-server/previ/87382440'},
    {'depart' : '87384008' , 'arrivee' : '', 'url' : 'http://rlier.fr/ligne-server/previ/87384008'},
    {'depart' : '87384008' , 'arrivee' : '', 'url' : '../ligne-server/previ/87384008'}
    ]}
  } 
});



