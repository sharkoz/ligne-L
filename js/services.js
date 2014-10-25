app.service('Getprevi', function(){
return {get : function(save, max){
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
	}
	}
});