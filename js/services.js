app.factory('DataSource', ['$http',function($http){
  return {
    get: function(callback, url){
      $http.get(
      url,
      {transformResponse:function(data) {
        // convert the data to JSON and provide
        // it to the success function below
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        //console.log(json.passages);
        return json.passages;
        }
      }
      ).success(function(data, status) {
        // send the converted data back
        // to the callback function
        callback(data);
        })
      }
    }
  }])


.service('LibGare', function(){
return { values : {'87381657' : 'ACHERES VILLE',
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
'87384008' : 'PARIS SAINT-LAZARE (GARE SAINT-LAZARE)',
'87381111' : 'PONT CARDINET',
'87382382' : 'PUTEAUX',
'87382358' : 'SAINT-CLOUD',
'87366922' : 'SAINT-GERMAIN EN LAYE BEL AIR FOURQUEUX',
'87382804' : 'SAINT-GERMAIN EN LAYE GRANDE CEINTURE',
'87382481' : 'SAINT-NOM LA BRETECHE FORET DE MARLY',
'87386417' : 'SARTROUVILLE',
'87382341' : 'SEVRES VILLE D\'AVRAY',
'87382374' : 'SURESNES MONT VALERIEN',
'87382267' : 'VAUCRESSON',
'87382861' : 'VERSAILLES RIVE DROITE',
'87382887' : 'VIROFLAY RIVE DROITE'}
   } })
         

.service('Param', function(){
  return { 
    values : {trajet : [
    {'depart' : '87382440' , 'arrivee' : '87384008', 'url' : '../ligne-server/live/87382440/87384008'},
    {'depart' : '87382440' , 'arrivee' : '', 'url' : 'data2.xml'},
    {'depart' : '87382440' , 'arrivee' : '', 'url' : 'data.xml'},
    {'depart' : '87382418' , 'arrivee' : '', 'url' : 'data2.xml'},
    {'depart' : '87382440' , 'arrivee' : '', 'url' : 'data2.xml'}
    ]}
  } 
});



