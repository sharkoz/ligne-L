function TrajetsService ($document, $window, $localStorage, $filter, InitService, GeolocService, ApiService, SpinnersService, LIB_GARE) {
	var TrajetsService = {};
	
	TrajetsService.live = {};
	TrajetsService.previ = {};
	TrajetsService.display = {};
	TrajetsService.details = {};
	TrajetsService.getDisplay = function(idTrajet){
		//console.log(idTrajet+' : '+TrajetsService.display[idTrajet]);
		return TrajetsService.display[idTrajet];
	}

	favIndex = function(idTrajet){
		array = $localStorage.favoris;
		for	(index = 0; index < array.length; index++) {
   			if(array[index].idTrajet == idTrajet){
   				return index;
   			}
		}
		return -1;
	}

	RefreshDistance = function(idTrajet){
		$localStorage.favoris[favIndex(idTrajet)].distance = GeolocService.calculateDistanceGare($localStorage.favoris[favIndex(idTrajet)].depart);
	}

	RefreshTrajet = function(idTrajet){
		if(TrajetsService.live[idTrajet] === undefined){
			TrajetsService.live[idTrajet]={};
		}
		if($localStorage.saveGtfs[idTrajet] === undefined){
			$localStorage.saveGtfs[idTrajet]={};
		}		
		if($localStorage.saveGtfs[idTrajet].passages === undefined){
			$localStorage.saveGtfs[idTrajet].passages={};
		}
		// Si les prévisions existent, on rafraichit asap
    	if ($localStorage.saveGtfs[idTrajet].passages.train !== undefined) {
    	    TrajetsService.previ[idTrajet] = getPrevi(idTrajet);
    	    TrajetsService.display[idTrajet] = merge(TrajetsService.live[idTrajet].train, TrajetsService.previ[idTrajet]);
    	}
	    // Si le gtfs n'est pas à jour on le telecharge
    	if ($localStorage.saveGtfs_refresh > $localStorage.saveGtfs[idTrajet].savedate || isNaN($localStorage.saveGtfs[idTrajet].savedate)) {
    	    saveGtfs(idTrajet);
    	}
    	else {
        	// Si les prévisions sont à jour on récupère juste le live
        	saveLive(idTrajet);
    	}
	}

	saveGtfs = function(idTrajet){
		ApiService.getGtfs($localStorage.favoris[favIndex(idTrajet)].depart, $localStorage.favoris[favIndex(idTrajet)].arrivee)
    	    .then(function(data) {
    	    	$localStorage.saveGtfs[idTrajet] = data;
    	    	$localStorage.saveGtfs[idTrajet].savedate = Math.floor(new Date().getTime()/1000);
    	    	RefreshTrajet(idTrajet);
    	    })
    	    .catch(function(error) {
    	    	console.log(error);
    	    });
	}

	saveLive = function(idTrajet){
    	ApiService.getLive($localStorage.favoris[favIndex(idTrajet)].depart, $localStorage.favoris[favIndex(idTrajet)].arrivee)
    		.then(function(data) {
        		TrajetsService.live[idTrajet] = data.passages;
        		TrajetsService.display[idTrajet] = merge(TrajetsService.live[idTrajet].train, TrajetsService.previ[idTrajet]);
    			SpinnersService.resetRefresh(idTrajet);
    		})
    		.catch(function(error) {
    			SpinnersService.errorRefresh(idTrajet);
       			console.log(error);
      		});
  	}

	TrajetsService.RefreshAll = function(){
		// TODO : remplace le broadcast
		_.each($localStorage.favoris, function(value){SpinnersService.setRefresh(value.idTrajet);});
		_.each($localStorage.favoris, function(value){RefreshTrajet(value.idTrajet);});
		_.each($localStorage.favoris, function(value){RefreshDistance(value.idTrajet);});
		//SpinnersService.resetRefresh();
	}

	TrajetsService.AddTrajet = function(depart, arrivee, is_ar){
		is_ar = is_ar || false;
		arrivee = arrivee || "0";
		if(_.isEmpty($localStorage.favoris)){
			idTrajet = 0;
		}
		else{
			idTrajet = _.max($localStorage.favoris, function(fav){return fav.idTrajet;}).idTrajet+1;			
		}
        $localStorage.favoris.push ({'idTrajet' : idTrajet, 'depart' : depart, 'arrivee' : arrivee, 'is_ar' : is_ar, 'distance': 0, 'aller': true});
        $localStorage.saveGtfs[idTrajet] = {};
        $localStorage.saveGtfs[idTrajet].savedate="0";

		InitService.gaTrackEvent("Trajet", "Add", "Trajet added", idTrajet);
		TrajetsService.RefreshAll();
	}

	TrajetsService.RmTrajet = function(idTrajet){
		if($window.confirm("Voulez vous supprimer ce trajet ?")) {
			$localStorage.favoris.splice(favIndex(idTrajet),1);
			$localStorage.saveGtfs = _.omit($localStorage.saveGtfs, idTrajet);
			TrajetsService.RefreshAll();	
		}
	}

	// Fonction pour récupérer les horaires théoriques des prochains trains
	getPrevi = function(idTrajet, max){
		max = max || 15;
		save = $localStorage.saveGtfs[idTrajet].passages;
		var i=0;
		var n=0;
		var take=0;
		var now = new Date(Date.now() - 1800000);
		var time=('0'+now.getHours()).substr(-2)+''+('0'+now.getMinutes()).substr(-2);
		var day = now.getFullYear()+'-'+('0'+(now.getMonth()+1)).substr(-2)+'-'+('0'+now.getDate()).substr(-2);
		var dow = now.getDay();
		var j;
		var res = new Array;
		var s=save.train.length;

        // Si aucun trajet on sort pour ne pas avoir d'erreur
        if(s==0){return;}
		//console.log('Init : long: '+s+' Time : '+time+' // day : '+day);
		
		while(n<max+15 && take<3){
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
			j.date.day = day;
			j.date.jsdate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), j.date.val.substr(0,2), j.date.val.substr(3,2)).getTime();
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
					//console.log(j);
					if(((j.valid.deb.replace(/-/g,"") <= day.replace(/-/g,"")) && (j.valid.fin.replace(/-/g,"") >= day.replace(/-/g,"")) && (j.valid.mask.indexOf(dow) > -1)) || (!!j.valid.plus && j.valid.plus.indexOf(day) > -1)){
						take = 1;
						//console.log('take');
						if(j.date.val>'23:59'){
							j.date.val = j.date.val.substr(0,2)-24 + j.date.val.substr(2,3);
						}
						//console.log(j);
						res.push(j);
						n=n+1;
						i=i+1;
					}
					else{
						i=i+1;
						//console.log('not');
						//console.log(j.valid.deb.replace(/-/g,"")+' <= '+day.replace(/-/g,"")+' :'+(j.valid.deb.replace(/-/g,"") <= day.replace(/-/g,""))+' && '+j.valid.fin.replace(/-/g,"")+' >= '+day.replace(/-/g,"")+' && '+j.valid.mask.indexOf(dow));
					}
				}
			}
		}
		//console.log(res);
		return res;
	};

	//Fonction pour merger les temps prévus et les temps réels
    merge = function(live, previ) {
        if(angular.isUndefined(live)){
        	return angular.copy(previ);
        }
        else{
	        var liv;
	        var pre;
	        var display;
	        display = angular.copy(previ);
	        for(liv=0; liv<live.length; ++liv){
	            for(pre=0; pre<previ.length; ++pre){
	                if(live[liv].num == previ[pre].num){
	                    display[pre].delta=(new Date('1970/01/01 '+previ[pre].date.val+':00')-new Date('1970/01/01 '+live[liv].date.val+':00'))/(-60000);
	                    if(display[pre].delta == "0"){
	                        display[pre].message = "OK";
	                    }
	                    else{
	                        display[pre].message = live[liv].date.val;
	                    }
	                    display[pre].date.mode='R';
	                    display[pre].date.reel=live[liv].date.val;
						display[pre].date.jsdate=live[liv].date.jsdate;
	                    display[pre].voie=live[liv].voie;
						if(live[liv].voie=='BL') {display[pre].voie='?';}
	                    display[pre].ligne=live[liv].ligne;
	                }
	            }
	        }
        	return display;
        }
    }

	return TrajetsService;
}
angular
  .module('ligneL')
  .factory('TrajetsService', TrajetsService);