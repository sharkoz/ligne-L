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
'ACW' : 'Ach�res-Ville',
'AEE' : 'Asni�res sur Seine',
'AEH' : 'Aubergenville Elisabethville',
'AHM' : 'Avenue Henri Martin',
'ALC' : 'Aubervilliers La Courneuve',
'ANY' : 'Andr�sy',
'APK' : 'Avenue du Pr�sident Kennedy',
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
'BEC' : 'B�con les Bruy�res',
'BFM' : 'Biblioth�que Fran�ois Mitterrand',
'BFX' : 'Le Bras de Fer',
'BGK' : 'Bagneux',
'BGV' : 'Bougival',
'BIH' : 'Breuillet Bruy�res le Chatel',
'BIS' : 'Bi�vres',
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
'BRK' : 'Bruy�res-sur-Oise',
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
'BXR' : 'Boissy Saint-L�ger',
'BY'  : 'Br�tigny',
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
'CGP' : 'Charles de Gaulle-�toile',
'CGW' : 'Coigni�res',
'CH'  : 'Chartres',
'CHK' : 'Chamarande',
'CHQ' : "Chemin d'Antony",
'CHR' : 'Chars',
'CHV' : 'Chaville V�lizy',
'CJN' : 'Changis Saint-Jean',
'CJR' : 'Chartrettes',
'CJV' : 'Cergy le Haut',
'CL'  : 'Creil',
'CLC' : 'Cr�cy-la-Chapelle',
'CLL' : 'Clichy Levallois',
'CLR' : 'Choisy le Roi',
'CLX' : 'Ch�telet les Halles',
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
'CTH' : 'Ch�teau Thierry',
'CUF' : 'Cit� Universitaire',
'CVF' : 'Chanteloup les Vignes',
'CVI' : 'Chaville Rive Gauche',
'CVW' : 'Courcelles sur Yvette',
'CWJ' : 'Chaville Rive Droite',
'CXA' : 'Ch�telet les Halles RER A',
'CYC' : 'Cergy Saint-Christophe',
'CYP' : 'Cergy Pr�fecture',
'CYQ' : 'Couilly Saint-Germain Quincy',
'CYV' : 'Cr�py-en-Valois',
'CYZ' : 'Ch�zy sur Marne',
'D'   : 'Dourdan',
'DA'  : 'Dourdan la For�t',
'DAM' : 'Dammartin Juilly-Saint-Mard',
'DDI' : 'Dordives',
'DEU' : 'Deuil Montmagny',
'DFR' : 'Denfert Rochereau',
'DMO' : 'Domont',
'DRN' : 'Drancy',
'DX'  : 'Dreux',
'ECZ' : '�couen �zanville',
'ELW' : "L'�tang-la-Ville",
'ELY' : '�gly',
'EM'  : 'Emerainville Pontault Combault',
'EN'  : 'Enghien les Bains',
'EPL' : '�pluches',
'EPN' : '�pernon',
'EPO' : '�pone M�zi�res',
'EPV' : '�pinay Villetaneuse',
'ERA' : '�ragny Neuville',
'ERM' : 'Ermont Halte',
'ERT' : 'Ermont Eaubonne',
'ESO' : 'Essonnes-Robinson',
'ETP' : '�tampes',
'ETY' : '�trechy',
'EVC' : '�vry Courcouronnes',
'EVR' : '�vry',
'EY'  : 'Esbly',
'EYO' : '�pinay sur Orge',
'EYS' : '�pinay sur Seine',
'FAF' : 'Fontenay le Fleury',
'FFY' : 'Ferri�res Fontenay',
'FMN' : 'Fontaine Michalon',
'FMP' : 'Faremoutiers Pommeuse',
'FMY' : 'La Frette Montigny',
'FNR' : 'Fontenay aux Roses',
'FON' : 'Fontainebleau Avon',
'FPB' : 'Franconville Le Plessis Bouchard',
'FPN' : 'Fr�pillon',
'FPO' : 'Fontaine le Port',
'FSB' : 'Fontenay-sous-Bois',
'GAJ' : 'Garges Sarcelles',
'GAQ' : 'Garanci�res la Queue',
'GAW' : 'La D�fense Grande Arche',
'GBG' : 'Grand Bourg',
'GBI' : 'Gravigny Balizy',
'GCM' : 'Gu�rard la Celle sur Morin',
'GCR' : 'Ach�res Grand Cormier',
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
'HAQ' : 'La Hacquini�re',
'HAR' : 'Houilles Carri�res sur Seine',
'HER' : 'H�ricy',
'HOA' : 'Houdan',
'HRY' : 'Herblay',
'HSL' : 'Haussman Saint-Lazare' ,
'IAC' : 'Isles-Armenti�res-Congis',
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
'KVE' : 'Les Clairi�res de Verneuil',
'LAD' : 'Les Ardoines',
'LBJ' : 'La Barre Ormesson',
'LBT' : 'Le Bourget',
'LCB' : 'La Celle-Saint-Cloud',
'LDU' : 'La D�fense',
'LEG' : 'Les Gr�sillons',
'LFA' : 'La Fert� Alais',
'LFC' : 'Louveciennes',
'LFJ' : 'La Fert� sous Jouarre',
'LFM' : 'La Fert� Milon',
'LGK' : 'La Garenne Colombes',
'LGY' : 'Lagny Thorigny',
'LIE' : "Saint-Ouen l'Aum�ne Liesse",
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
'LVZ' : 'La Varenne Chennevi�res',
'LWA' : 'Les Vall�es',
'LXJ' : 'Luxembourg',
'LYO' : 'Lardy',
'LYQ' : 'Livry sur Seine',
'LYV' : 'Les Yvris Noisy Le Grand' ,
'LZO' : 'Lizy-sur-Ourcq',
'LZV' : 'Loz�re',
'MAE' : 'Maule',
'MGT' : 'Magenta',
'MAL' : 'Malesherbes',
'MAQ' : 'Mareuil-sur-Ourcq',
'MBP' : 'Montigny Beauchamp',
'MBR' : 'Marchezais Brou�',
'MDN' : 'Meudon',
'MDS' : "Mus�e d'Orsay",
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
'MLM' : "Montfort l'Amaury M�r�",
'MLR' : 'Marly-le-Roi',
'MLV' : 'Meriel',
'MNY' : 'Mennecy',
'MOF' : 'Mortcerf',
'MOR' : 'Mor�t Veneux les Sablons',
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
'MVC' : 'Marne la Vall�e Chessy',
'MVH' : 'Suresnes Mont Val�rien',
'MVP' : 'Massy Verri�res RER B',
'MVW' : 'Massy Verri�res RER C',
'MWO' : 'M�ry sur Oise', 
'MXK' : 'Mouroux',
'MY'  : 'Mitry Claye',
'MYD' : 'Montry Cond�',
'NAA' : "Nogent l'Artaud Charly",
'NAF' : 'Nanterre Pr�fecture',
'NAN' : 'Nangis',
'NAU' : 'Nanteuil Saacy',
'NC1' : 'Saint-Germain-en-Laye',
'NC2' : 'Le V�sinet Le Pecq',
'NC3' : 'Nanterre Ville',
'NC4' : 'Le V�sinet-Centre',
'NC5' : 'Chatou-Croissy',
'NC6' : 'Rueil-Malmaison',
'NG'  : 'La Norville Saint-Germain l�s Arpajon',
'NGM' : 'Nogent-sur-Marne',
'NH'  : 'Nanteuil-le-Haudoin',
'NLP' : 'Nogent Le Perreux' ,
'NO'  : 'Nointel - Mours',
'NPT' : 'Neuilly Porte Maillot',
'NSL' : 'Noisiel',
'NSP' : 'Nemours Saint-Pierre',
'NSY' : 'Noisy Le Sec' ,
'NTN' : 'Nation',
'NUE' : 'Neuville Universit�',
'NUN' : 'Nanterre Universit�',
'NYC' : 'Noisy Champs',
'NYG' : "Noisy le Grand Mont d'Est",
'NYP' : 'Neuilly Plaisance',
'NZL' : 'Nezel Aulnay',
'OBP' : "Orangis Bois de l'�pine",
'OGB' : 'Orgerus Behoust',
'ORM' : 'Ormoy-Villers',
'ORS' : 'Orsay Ville',
'ORY' : 'Orry la Ville Coye',
'OSN' : 'Osny',
'OY'  : 'Orly Ville',
'OZF' : 'Ozoir la Ferri�re' ,
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
'PPD' : 'Cr�teil Pompadour', 
'PPT' : 'Pont-Petit',
'PRF' : 'Pierrefitte Stains',
'PRO' : 'Provins',
'PRQ' : 'Presles - Courcelles',
'PRR' : 'Pereire Levallois',
'PRU' : "Pont de Rungis A�roport d'Orly",
'PRY' : 'Pierrelaye',
'PSE' : 'Pontoise',
'PSL' : 'Paris Saint-Lazare',
'PSY' : 'Poissy',
'PTC' : 'Pont Cardinet',
'PTX' : 'Puteaux',
'PV'  : 'Petit Vaux',
'PWR' : 'Port Royal',
'PXO' : 'Le Parc de Saint-Maur',
'PYO' : 'Pr�cy-sur-Oise',
'PZB' : 'Paris Austerlitz',
'RBI' : 'Rosny Bois Perrier' ,
'RBT' : 'Rambouillet',
'RF'  : 'Rungis la Fraternelle',
'RIS' : 'Ris Orangis',
'RNS' : 'Robinson',
'ROB' : 'Roissy en Brie' ,
'RSB' : 'Rosny sous Bois' ,
'RSY' : 'A�roport Charles de Gaulle 1',
'RVM' : 'Le Raincy Villemomble' ,
'RYR' : 'A�roport Charles de Gaulle 2 TGV',
'SAO' : 'Savigny sur Orge',
'SCD' : 'Saint-Cloud',
'SCR' : 'Saint-Cyr',
'SCW' : 'Saint-Ch�ron',
'SDE' : 'Saint-Denis',
'SEV' : 'Sevran Livry',
'SF'  : 'Saint-Mammes',
'SFD' : 'Stade de France Saint-Denis',
'SGT' : 'Saint-Gratien',
'SHL' : 'Saint-Michel Notre Dame RER C', 
'SHO' : 'Saint-Michel sur Orge',
'SKX' : 'Sceaux',
'SLF' : 'Saint-Leu la For�t',
'SLL' : 'Sarcelles Saint-Brice',
'SLT' : "Saint-Leu d'Esserent",
'SME' : "Saint-Martin d'�tampes",
'SNB' : 'Saint-Nom-la-Bret�che - For�t de Marly',
'SNM' : 'Saint-R�my l�s Chevreuse',
'SNN' : 'Sannois',
'SOA' : "Saint-Ouen l'Aum�ne",
'SOS' : 'Saint-Ouen',
'SPI' : 'Saint-Piat',
'SPP' : 'Souppes Ch�teau Landon',
'SQY' : 'Saint-Quentin en Yvelines',
'SUR' : 'Survilliers Fosses',
'SVL' : 'Sartrouville',
'SVR' : 'S�vres Rive Gauche',
'SWY' : 'Seugy',
'SXE' : 'Sermaise',
'SXG' : 'Sainte Genevi�ve des Bois',
'TAE' : 'Tacoigni�res Richebourg',
'TLP' : 'Trilport',
'TMR' : 'Thomery',
'TNT' : 'Thieux - Nantouillet',
'TOC' : 'Torcy',
'TOU' : 'Tournan',
'TPA' : 'Thun le Paradis',
'TRH' : 'Trie-Ch�teau',
'TSS' : 'Triel sur Seine',
'TVO' : 'Trappes',
'TVY' : 'Taverny',
'US'  : 'Us',
'VAI' : 'Vaires Torcy',
'VBB' : 'Villiers-Montbarbin',
'VBO' : 'Vauboyen',
'VBV' : 'Villab�',
'VC'  : 'Versailles Chantiers',
'VCN' : 'Vaucresson',
'VCX' : 'Vaucelles',
'VD'  : 'Le Vert de Maisons',
'VDA' : "Val d'Argenteuil",
'VDE' : "Val d'Europe",
'VDF' : "Val de Fontenay RER E",
'VDO' : "Le Val d'Or",
'VDV' : "S�vres Ville d'Avray",
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
'VNL' : "Verneuil l'�tang",
'VOM' : 'Vosves',
'VP'  : 'Villeneuve Prairie',
'VPN' : 'Villepinte',
'VRD' : 'Versailles Rive Droite',
'VRG' : 'Versailles Rive Gauche Ch�teau',
'VRI' : 'Villeneuve le Roi',
'VSG' : 'Villeneuve Saint-Georges',
'VSM' : 'Villiers sur Marne Plessis Tr�vise',
'VSS' : 'Vernou sur Seine',
'VSW' : 'Villennes sur Seine',
'VTV' : 'Villeneuve Triage',
'VUN' : 'Vulaines sur Seine Samoreau',
'VW'  : 'Villaines',
'VWC' : 'Viry Ch�tillon',
'VWT' : 'La Villetertre',
'VXS' : 'Vaux sur Seine',
'VY'  : 'Vitry sur Seine',
'VYL' : 'La Verri�re',
'WEE' : 'Le M�e',
'XBY' : 'La Croix de Berny',
'XCS' : 'Saint-Colombe - Septveilles',
'XFA' : 'Saint-Fargeau',
'XMC' : 'Saint-Maur-Cr�teil',
'XND' : 'Saint-Michel Notre Dame RER B',
'XOA' : "Saint-Ouen l'Aum�ne Quartier de l'�glise",
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
          msg = "Impossible de vous g�olocaliser";
          break;
        case err.PERMISSION_DENINED:
          msg = "Permission refus�e pour la g�olocalisation";
          break;
        case err.POSITION_UNAVAILABLE:
          msg = "Votre position n'est pas disponible";
          break;
        case err.BREAK:
          msg = "La g�olocalisation a mis trop de temps";
          break;
        default:
          msg = "Votre appareil ne supporte pas la g�olocalisation";
      }
    console.log(msg);
    }

});



