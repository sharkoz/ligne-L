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
{"key" : "PSL", "value" : "PARIS SAINT-LAZARE", "latitude" : "48.87535783596312", "longitude" : "2.3247332774874016"}
],
func : {
'AB'  : 'Aulnay sous Bois',
'ABL' : 'Ablon',
'ACW' : 'Achères-Ville',
'AEE' : 'Asnières sur Seine',
'AEH' : 'Aubergenville Elisabethville',
'AHM' : 'Avenue Henri Martin',
'ALC' : 'Aubervilliers La Courneuve',
'ANY' : 'Andrésy',
'APK' : 'Avenue du Président Kennedy',
'ARK' : 'Arcueil Cachan',
'ARP' : 'Arpajon',
'ARW' : 'Argenteuil',
'ATH' : 'Athis Mons',
'ATW' : 'Antony',
'AUU' : 'Auber',
'AUW' : 'Auvers-sur-Oise',
'AVF' : 'Avenue Foch',
'BAM' : 'Blanc Mesnil',
'BBN' : 'La Borne Blanche',
'BCO' : 'Bois Colombes',
'BDE' : 'Sevran Beaudottes',
'BDY' : 'Bondy' ,
'BEC' : 'Bécon les Bruyères',
'BFM' : 'Bibliothèque François Mitterrand',
'BFX' : 'Le Bras de Fer',
'BGK' : 'Bagneux',
'BGV' : 'Bougival',
'BIH' : 'Breuillet Bruyères le Chatel',
'BIS' : 'Bièvres',
'BJN' : 'Boutigny',
'BJR' : 'Bois Le Roi',
'BKR' : 'Boissise-le-Roi',
'BLA' : "Boissy-l'Aillerie",
'BLU' : 'Bellevue',
'BNY' : 'Brunoy',
'BOF' : 'Bouffemont Moisselles',
'BOM' : 'Bourron Marlotte Grez',
'BQA' : 'Bry sur Marne',
'BQC' : 'Les Baconnets',
'BQQ' : 'Bourg la Reine',
'BQV' : 'Buno-Gironville',
'BRK' : 'Bruyères-sur-Oise',
'BRN' : 'Boran-sur-Oise',
'BRW' : 'Breuillet Village',
'BSO' : 'Bouray',
'BSR' : 'Bessancourt',
'BSW' : 'Belloy - Saint-Martin',
'BUR' : 'Ballancourt',
'BVI' : 'Boulevard Victor - Pont du Garigliano',
'BVJ' : 'Bures sur Yvette',
'BWI' : 'Boigneville',
'BWR' : 'Boulainvilliers',
'BXG' : 'Bussy Saint-Georges',
'BXI' : 'Boussy Saint-Antoine',
'BXN' : 'Bagneaux sur Loing',
'BXP' : 'Les Boullereaux Champigny',
'BXR' : 'Boissy Saint-Léger',
'BY'  : 'Brétigny',
'BYS' : 'Beynes',
'CAZ' : 'Chilly Mazarin',
'CBK' : 'Colombes',
'CBV' : 'Combs la Ville Quincy',
'CEG' : "Champ de Courses d'Enghien",
'CEJ' : 'Cernay',
'CES' : 'Cesson',
'CEV' : 'Chaumont-en-Vexin',
'CEX' : 'Le Coudray-Monceaux',
'CFD' : "Conflans-Fin-d'Oise",
'CGG' : 'Chenay Gagny' ,
'CGJ' : 'Champigny',
'CGP' : 'Charles de Gaulle-Étoile',
'CGW' : 'Coignières',
'CH'  : 'Chartres',
'CHK' : 'Chamarande',
'CHQ' : "Chemin d'Antony",
'CHR' : 'Chars',
'CHV' : 'Chaville Vélizy',
'CJN' : 'Changis Saint-Jean',
'CJR' : 'Chartrettes',
'CJV' : 'Cergy le Haut',
'CL'  : 'Creil',
'CLC' : 'Crécy-la-Chapelle',
'CLL' : 'Clichy Levallois',
'CLR' : 'Choisy le Roi',
'CLX' : 'Châtelet les Halles',
'CLY' : 'Chantilly Gouvieux',
'CMA' : 'Clamart',
'CME' : 'Champagne sur Seine',
'CO'  : 'Coulommiers',
'COE' : 'Corbeil Essonnes',
'COJ' : 'Compans',
'CPA' : 'Cormeilles en Parisis',
'CPK' : 'Champbenoist - Poigny',
'CPM' : 'Champ de Mars Tour Eiffel',
'CPO' : 'Champagne sur Oise',
'CPW' : 'Chaponval',
'CQQ' : 'Crouy-sur-Ourcq',
'CSG' : 'Chelles Gournay',
'CSH' : 'Conflans Sainte Honorine',
'CTH' : 'Château Thierry',
'CUF' : 'Cité Universitaire',
'CVF' : 'Chanteloup les Vignes',
'CVI' : 'Chaville Rive Gauche',
'CVW' : 'Courcelles sur Yvette',
'CWJ' : 'Chaville Rive Droite',
'CXA' : 'Châtelet les Halles RER A',
'CYC' : 'Cergy Saint-Christophe',
'CYP' : 'Cergy Préfecture',
'CYQ' : 'Couilly Saint-Germain Quincy',
'CYV' : 'Crépy-en-Valois',
'CYZ' : 'Chézy sur Marne',
'D'   : 'Dourdan',
'DA'  : 'Dourdan la Forêt',
'DAM' : 'Dammartin Juilly-Saint-Mard',
'DDI' : 'Dordives',
'DEU' : 'Deuil Montmagny',
'DFR' : 'Denfert Rochereau',
'DMO' : 'Domont',
'DRN' : 'Drancy',
'DX'  : 'Dreux',
'ECZ' : 'Écouen Ézanville',
'ELW' : "L'Étang-la-Ville",
'ELY' : 'Égly',
'EM'  : 'Emerainville Pontault Combault',
'EN'  : 'Enghien les Bains',
'EPL' : 'Épluches',
'EPN' : 'Épernon',
'EPO' : 'Épone Mézières',
'EPV' : 'Épinay Villetaneuse',
'ERA' : 'Éragny Neuville',
'ERM' : 'Ermont Halte',
'ERT' : 'Ermont Eaubonne',
'ESO' : 'Essonnes-Robinson',
'ETP' : 'Étampes',
'ETY' : 'Étrechy',
'EVC' : 'Évry Courcouronnes',
'EVR' : 'Évry',
'EY'  : 'Esbly',
'EYO' : 'Épinay sur Orge',
'EYS' : 'Épinay sur Seine',
'FAF' : 'Fontenay le Fleury',
'FFY' : 'Ferrières Fontenay',
'FMN' : 'Fontaine Michalon',
'FMP' : 'Faremoutiers Pommeuse',
'FMY' : 'La Frette Montigny',
'FNR' : 'Fontenay aux Roses',
'FON' : 'Fontainebleau Avon',
'FPB' : 'Franconville Le Plessis Bouchard',
'FPN' : 'Frépillon',
'FPO' : 'Fontaine le Port',
'FSB' : 'Fontenay-sous-Bois',
'GAJ' : 'Garges Sarcelles',
'GAQ' : 'Garancières la Queue',
'GAW' : 'La Défense Grande Arche',
'GBG' : 'Grand Bourg',
'GBI' : 'Gravigny Balizy',
'GCM' : 'Guérard la Celle sur Morin',
'GCR' : 'Achères Grand Cormier',
'GDS' : 'Paris Nord',
'GEN' : 'Gennevilliers',
'GGG' : 'Grigny Centre',
'GGV' : 'Gargenville',
'GIF' : 'Gif sur Yvette',
'GIS' : 'Gisors',
'GMC' : 'Garches Marnes-la-Coquette',
'GN'  : 'Gagny' ,
'GNX' : 'Gros Noyer Saint-Prix',
'GOU' : 'Goussainville',
'GPA' : 'La Grande Paroisse',
'GRL' : 'Groslay',
'GTL' : 'Gentilly',
'GUW' : 'Le Guichet',
'GYN' : 'Gare de Lyon RER A',
'GZ'  : 'Gretz Armainvilliers' ,
'GZA' : 'Gazeran',
'HAQ' : 'La Hacquinière',
'HAR' : 'Houilles Carrières sur Seine',
'HER' : 'Héricy',
'HOA' : 'Houdan',
'HRY' : 'Herblay',
'HSL' : 'Haussman Saint-Lazare' ,
'IAC' : 'Isles-Armentières-Congis',
'IAP' : "L'Isle Adam Parmain",
'IBM' : 'Le Plessis-Chenet',
'IGY' : 'Igny',
'INV' : 'Invalides',
'IPO' : 'Issou Porcheville',
'ISP' : 'Issy Val de Seine',
'ISY' : 'Issy',
'IV'  : 'Ivry sur Seine',
'JAS' : 'Jouy en Josas',
'JOY' : 'Jouy',
'JUZ' : 'Juziers',
'JVL' : 'Javel',
'JVR' : 'Joinville-le-Pont',
'JY'  : 'Juvisy',
'KOU' : 'Courbevoie',
'KRW' : 'Montgeron Crosne',
'KVE' : 'Les Clairières de Verneuil',
'LAD' : 'Les Ardoines',
'LBJ' : 'La Barre Ormesson',
'LBT' : 'Le Bourget',
'LCB' : 'La Celle-Saint-Cloud',
'LDU' : 'La Défense',
'LEG' : 'Les Grésillons',
'LFA' : 'La Ferté Alais',
'LFC' : 'Louveciennes',
'LFJ' : 'La Ferté sous Jouarre',
'LFM' : 'La Ferté Milon',
'LGK' : 'La Garenne Colombes',
'LGY' : 'Lagny Thorigny',
'LIE' : "Saint-Ouen l'Aumône Liesse",
'LIM' : 'Limay',
'LIU' : 'Lieusaint Moissy',
'LJA' : 'Laplace',
'LJU' : 'Longjumeau',
'LMU' : 'Les Mureaux',
'LNX' : 'Les Noues',
'LON' : 'Longueville', 
'LOV' : 'Louvres',
'LPE' : 'Le Perray',
'LPN' : 'La Plaine Stade de France',
'LQK' : 'Liancourt-Saint-Pierre',
'LQN' : 'Lognes',
'LSD' : 'Le Stade',
'LSI' : 'Les Essarts le Roi',
'LSW' : 'Les Saules',
'LUZ' : 'Luzarches',
'LVZ' : 'La Varenne Chennevières',
'LWA' : 'Les Vallées',
'LXJ' : 'Luxembourg',
'LYO' : 'Lardy',
'LYQ' : 'Livry sur Seine',
'LYV' : 'Les Yvris Noisy Le Grand' ,
'LZO' : 'Lizy-sur-Ourcq',
'LZV' : 'Lozère',
'MAE' : 'Maule',
'MGT' : 'Magenta',
'MAL' : 'Malesherbes',
'MAQ' : 'Mareuil-sur-Ourcq',
'MBP' : 'Montigny Beauchamp',
'MBR' : 'Marchezais Broué',
'MDN' : 'Meudon',
'MDS' : "Musée d'Orsay",
'MEA' : 'Meaux',
'MEL' : 'Melun',
'MFA' : 'Maisons Alfort Alfortville',
'MFL' : 'Montreuil',
'MFY' : 'Meudon Val Fleury',
'MHD' : 'Meulan Hardricourt',
'MJM' : 'Mareil sur Mauldre',
'MJW' : 'Moulin-Galant',
'MKN' : 'Montigny sur Loing',
'MKU' : 'Montgeroult - Courcelles',
'MLB' : 'Marles en Brie',
'MLF' : 'Maisons Laffitte',
'MLM' : "Montfort l'Amaury Méré",
'MLR' : 'Marly-le-Roi',
'MLV' : 'Meriel',
'MNY' : 'Mennecy',
'MOF' : 'Mortcerf',
'MOR' : 'Morêt Veneux les Sablons',
'MP'  : 'Massy Palaiseau RER B',
'MPU' : 'Massy Palaiseau RER C',
'MRK' : 'Maurecourt',
'MRT' : 'Mormant',
'MS'  : 'Montargis',
'MSN' : 'Maisse',
'MSO' : 'Montsoult Maffliers',
'MSX' : 'Marolles en Hurepoix',
'MTE' : 'Mantes la Jolie',
'MTN' : 'Maintenon',
'MTQ' : 'Mantes Station',
'MTU' : 'Montereau',
'MVC' : 'Marne la Vallée Chessy',
'MVH' : 'Suresnes Mont Valérien',
'MVP' : 'Massy Verrières RER B',
'MVW' : 'Massy Verrières RER C',
'MWO' : 'Méry sur Oise', 
'MXK' : 'Mouroux',
'MY'  : 'Mitry Claye',
'MYD' : 'Montry Condé',
'NAA' : "Nogent l'Artaud Charly",
'NAF' : 'Nanterre Préfecture',
'NAN' : 'Nangis',
'NAU' : 'Nanteuil Saacy',
'NC1' : 'Saint-Germain-en-Laye',
'NC2' : 'Le Vésinet Le Pecq',
'NC3' : 'Nanterre Ville',
'NC4' : 'Le Vésinet-Centre',
'NC5' : 'Chatou-Croissy',
'NC6' : 'Rueil-Malmaison',
'NG'  : 'La Norville Saint-Germain lès Arpajon',
'NGM' : 'Nogent-sur-Marne',
'NH'  : 'Nanteuil-le-Haudoin',
'NLP' : 'Nogent Le Perreux' ,
'NO'  : 'Nointel - Mours',
'NPT' : 'Neuilly Porte Maillot',
'NSL' : 'Noisiel',
'NSP' : 'Nemours Saint-Pierre',
'NSY' : 'Noisy Le Sec' ,
'NTN' : 'Nation',
'NUE' : 'Neuville Université',
'NUN' : 'Nanterre Université',
'NYC' : 'Noisy Champs',
'NYG' : "Noisy le Grand Mont d'Est",
'NYP' : 'Neuilly Plaisance',
'NZL' : 'Nezel Aulnay',
'OBP' : "Orangis Bois de l'Épine",
'OGB' : 'Orgerus Behoust',
'ORM' : 'Ormoy-Villers',
'ORS' : 'Orsay Ville',
'ORY' : 'Orry la Ville Coye',
'OSN' : 'Osny',
'OY'  : 'Orly Ville',
'OZF' : 'Ozoir la Ferrière' ,
'PLY' : 'Paris Gare de Lyon', 
'PAA' : 'Paris Gare de Lyon',
'PAN' : 'Pantin' ,
'PAW' : 'Palaiseau Villebon',
'PAX' : 'Palaiseau',
'PCX' : 'Parc de Sceaux',
'PDM' : "Pont de l'Alma",
'PE'  : 'Paris Est',
'PEB' : 'Persan Beaumont',
'PEX' : 'Parc des Expositions',
'PG'  : 'Plaisir Grignon',
'PIE' : 'Plaisir les Clayes',
'PJ'  : 'Petit Jouy les Loges',
'PKY' : 'Porte de Clichy',
'PLB' : 'Plessis-Belleville',
'PMP' : 'Paris Montparnasse',
'POA' : 'Porchefontaine',
'POP' : 'Ponthierry-Pringy',
'PPD' : 'Créteil Pompadour', 
'PPT' : 'Pont-Petit',
'PRF' : 'Pierrefitte Stains',
'PRO' : 'Provins',
'PRQ' : 'Presles - Courcelles',
'PRR' : 'Pereire Levallois',
'PRU' : "Pont de Rungis Aéroport d'Orly",
'PRY' : 'Pierrelaye',
'PSE' : 'Pontoise',
'PSL' : 'Paris Saint-Lazare',
'PSY' : 'Poissy',
'PTC' : 'Pont Cardinet',
'PTX' : 'Puteaux',
'PV'  : 'Petit Vaux',
'PWR' : 'Port Royal',
'PXO' : 'Le Parc de Saint-Maur',
'PYO' : 'Précy-sur-Oise',
'PZB' : 'Paris Austerlitz',
'RBI' : 'Rosny Bois Perrier' ,
'RBT' : 'Rambouillet',
'RF'  : 'Rungis la Fraternelle',
'RIS' : 'Ris Orangis',
'RNS' : 'Robinson',
'ROB' : 'Roissy en Brie' ,
'RSB' : 'Rosny sous Bois' ,
'RSY' : 'Aéroport Charles de Gaulle 1',
'RVM' : 'Le Raincy Villemomble' ,
'RYR' : 'Aéroport Charles de Gaulle 2 TGV',
'SAO' : 'Savigny sur Orge',
'SCD' : 'Saint-Cloud',
'SCR' : 'Saint-Cyr',
'SCW' : 'Saint-Chéron',
'SDE' : 'Saint-Denis',
'SEV' : 'Sevran Livry',
'SF'  : 'Saint-Mammes',
'SFD' : 'Stade de France Saint-Denis',
'SGT' : 'Saint-Gratien',
'SHL' : 'Saint-Michel Notre Dame RER C', 
'SHO' : 'Saint-Michel sur Orge',
'SKX' : 'Sceaux',
'SLF' : 'Saint-Leu la Forêt',
'SLL' : 'Sarcelles Saint-Brice',
'SLT' : "Saint-Leu d'Esserent",
'SME' : "Saint-Martin d'Étampes",
'SNB' : 'Saint-Nom-la-Bretèche - Forêt de Marly',
'SNM' : 'Saint-Rémy lès Chevreuse',
'SNN' : 'Sannois',
'SOA' : "Saint-Ouen l'Aumône",
'SOS' : 'Saint-Ouen',
'SPI' : 'Saint-Piat',
'SPP' : 'Souppes Château Landon',
'SQY' : 'Saint-Quentin en Yvelines',
'SUR' : 'Survilliers Fosses',
'SVL' : 'Sartrouville',
'SVR' : 'Sèvres Rive Gauche',
'SWY' : 'Seugy',
'SXE' : 'Sermaise',
'SXG' : 'Sainte Geneviève des Bois',
'TAE' : 'Tacoignières Richebourg',
'TLP' : 'Trilport',
'TMR' : 'Thomery',
'TNT' : 'Thieux - Nantouillet',
'TOC' : 'Torcy',
'TOU' : 'Tournan',
'TPA' : 'Thun le Paradis',
'TRH' : 'Trie-Château',
'TSS' : 'Triel sur Seine',
'TVO' : 'Trappes',
'TVY' : 'Taverny',
'US'  : 'Us',
'VAI' : 'Vaires Torcy',
'VBB' : 'Villiers-Montbarbin',
'VBO' : 'Vauboyen',
'VBV' : 'Villabé',
'VC'  : 'Versailles Chantiers',
'VCN' : 'Vaucresson',
'VCX' : 'Vaucelles',
'VD'  : 'Le Vert de Maisons',
'VDA' : "Val d'Argenteuil",
'VDE' : "Val d'Europe",
'VDF' : "Val de Fontenay RER E",
'VDO' : "Le Val d'Or",
'VDV' : "Sèvres Ville d'Avray",
'VEH' : 'Villiers Neauphle Pontchartrain',
'VEP' : 'Villepreux les Clayes',
'VET' : 'Vernouillet Verneuil',
'VFD' : 'Viroflay Rive Droite',
'VFG' : 'Viroflay Rive Gauche',
'VFR' : 'Val de Fontenay RER A',
'VGL' : 'Vert Galant',
'VGS' : 'Vigneux sur Seine',
'VIB' : 'Villiers le Bel Gonesse Arnouville',
'VII' : 'Villeparisis Mitry Le Neuf',
'VMD' : 'Valmondois',
'VMK' : 'Vanves Malakoff',
'VMS' : 'Viarmes',
'VNC' : 'Vincennes',
'VNL' : "Verneuil l'Étang",
'VOM' : 'Vosves',
'VP'  : 'Villeneuve Prairie',
'VPN' : 'Villepinte',
'VRD' : 'Versailles Rive Droite',
'VRG' : 'Versailles Rive Gauche Château',
'VRI' : 'Villeneuve le Roi',
'VSG' : 'Villeneuve Saint-Georges',
'VSM' : 'Villiers sur Marne Plessis Trévise',
'VSS' : 'Vernou sur Seine',
'VSW' : 'Villennes sur Seine',
'VTV' : 'Villeneuve Triage',
'VUN' : 'Vulaines sur Seine Samoreau',
'VW'  : 'Villaines',
'VWC' : 'Viry Châtillon',
'VWT' : 'La Villetertre',
'VXS' : 'Vaux sur Seine',
'VY'  : 'Vitry sur Seine',
'VYL' : 'La Verrière',
'WEE' : 'Le Mée',
'XBY' : 'La Croix de Berny',
'XCS' : 'Saint-Colombe - Septveilles',
'XFA' : 'Saint-Fargeau',
'XMC' : 'Saint-Maur-Créteil',
'XND' : 'Saint-Michel Notre Dame RER B',
'XOA' : "Saint-Ouen l'Aumône Quartier de l'Église",
'XPY' : 'Santeuil - Le Perchay',
'YES' : 'Yerres',
'ZTN' : 'Savigny le Temple Nandy',
'ZUB' : 'Sucy Bonneuil'},
gareloc : {
"BGV" : { "latitude" : 48.8542235, "longitude" : 2.1322404},
"PSL" : { "latitude" : 48.8753578, "longitude" : 2.3247332}}
   } })
         

.service('Param', function(){
  return { 
    values : {trajet : [
	{'depart' : 'PSL' , 'arrivee' : 'SNB', 'path' : 'mobil'},
    {'depart' : 'BGV' , 'arrivee' : 'PSL', 'path' : 'mobil'}
    ]}
  } 
})

.service('Getprevi', function(){
return {get : function(save, max){
		var i=0;
		var n=0;
		var take=0;
		var now = new Date(Date.now());
		var time=('0'+now.getHours()).substr(-2)+''+('0'+now.getMinutes()).substr(-2);
		var day = now.getFullYear()+'-'+('0'+(now.getMonth()+1)).substr(-2)+'-'+('0'+now.getDate()).substr(-2);
		var dow = now.getDay();
		var j;
		var res = new Array;
		var s=save.train.length;
		//console.log('Init : long: '+s+' Time : '+time+' // day : '+day);
		
		while(n<max && take<3){
		//while(i<s-3){
			//console.log('reboot : i='+i+' , n='+n+' ,take='+take);
			if(i>s-1){
				i=0;
				now = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
				day = now.getFullYear()+'-'+('0'+(now.getMonth()+1)).substr(-2)+'-'+('0'+now.getDate()).substr(-2);
				dow = now.getDay();
				//console.log('long: '+s+' Time : '+time+' // day : '+day);
				take=take+1
			}
			j = save.train[i];
			//console.log(j);
			if(j.date.val.replace(":","") < time && take==0){
				i=i+1;
				//console.log('no / '+j.date.val.replace(":","")+' > '+time);
			}
			else {
				//console.log(j.date.val.replace(":","")+' > '+time);
				if(!!j.valid.moins && j.valid.moins.indexOf(day)>-1){
					i=i+1;
					//console.log('moins');
				}
				else {
					if(((j.valid.deb.replace(/-/g,"") <= day.replace(/-/g,"")) && (j.valid.fin.replace(/-/g,"") >= day.replace(/-/g,"")) && (j.valid.mask.indexOf(dow) > -1)) || (!!j.valid.plus && j.valid.plus.indexOf(day) > -1)){
						take = 1;
						//console.log('take');
						if(j.date.val>'23:59'){
							j.date.val = j.date.val.substr(0,2)-24 + j.date.val.substr(2,3);
						}
						res.push(j);
						n=n+1;
						i=i+1;
					}
					else{
						i=i+1;
						//console.log(j.valid.deb.replace(/-/g,"")+' <= '+day.replace(/-/g,"")+' :'+(j.valid.deb.replace(/-/g,"") <= day.replace(/-/g,""))+' && '+j.valid.fin.replace(/-/g,"")+' >= '+day.replace(/-/g,"")+' && '+j.valid.mask.indexOf(dow));
					}
				}
			}
		}
		//console.log(res);
		return res;
	}
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



