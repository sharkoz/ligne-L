
/* Controllers */


app.controller('AppCtrl',function( $scope, $location, $document, $window, $localStorage, $ionicModal, Geomath, Locate, LIB_GARE, GeolocService, InitService, ApiService, TrajetsService){
  //console.log("Chargement du controller AppCtrl pour "+$scope.$id);
	// TODO : mettre dans app
	FastClick.attach(document.body);


  /** Lancer les analytics après le deviceReady */
	// TODO : mettre dans app
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
    console.log("deviceready from controller.js");
		//analytics();
	}

    $scope.$on('$routeChangeSuccess', function(event, next, current) {
		  // Cacher le menu
		  $scope.modalShown=false;
		  $scope.route = next.route;
		  if ($scope.phonegap) {$scope.gaPlugin.trackPage(successHandler, errorHandler, $scope.route);};
    });

    /** Gestion des Modals */
    // Modal du menu caché par défaut
    $scope.modalShown = false;
    // Fonction pour toggle l'affichage du Modal du menu
    $scope.toggleModal = function() {
    //console.log($route.current.loadedTemplateUrl);
      $scope.modalShown = !$scope.modalShown;
    };

    // Modal de détail du train caché par défaut
  	$scope.modal = false;
    // Fonction pour toggle l'affichage du Modal de détail du train
  	$scope.newModal = function(train, dest, dep) {
		  $scope.openModal();
		  //console.log("Toggle open");
  	 	$scope.train = train;
      $scope.dest = dest;
      $scope.dep = dep;
      // get détail
      $scope.detailloading = true;

      ApiService.getDetail($scope.train.longnum)
        .then(function(data) {
          $scope.getDetail(data);
        })
        .catch(function(error) {
          $scope.getDetailError(error)
        });

      if ($scope.phonegap) {$scope.gaPlugin.trackEvent($scope.successHandler, $scope.errorHandler, "App", "GetDetails", "Get Details", 1);};
  	};
    // Ajout de la transco des gares pour le modal
    $scope.gare = LIB_GARE;

    $scope.closeModal = function(){
      $scope.train = undefined;
      $scope.dest = undefined;
      $scope.detail = undefined;
    };

    $scope.getDetail = function(data){
      console.log("fini")
        $scope.detail = data;
        $scope.detailloading = false;
    };
    $scope.getDetailError = function(err){
        console.log("Erreur recuperation des details en live");
        $scope.detailloading = "";
    };
	
  $ionicModal.fromTemplateUrl('detail-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalionic = modal
  })

  $scope.openModal = function() {
    $scope.modalionic.show()
  }

  $scope.closeModal = function() {
    $scope.modalionic.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modalionic.remove();
  });

  /** Fin gestion des Modals */
	 
	/** Gestion de l'agenda par trajet */
	
	$scope.setAgenda = function (trajet) {
		$scope.idTrajet = trajet.idTrajet;
		//console.log("Agenda set on scope "+$scope.$id);
		$scope.slideIndex = 0;
	}

  onResume = function(){
    //console.log("onresume");    
    TrajetsService.RefreshAll();
    GeolocService.RefreshLoc();
    InitService.gaTrackEvent("App", "Refresh", "App refreshed", 1);
  };
  $scope.onResume = function(){
    console.log("scope.onresume");
    TrajetsService.RefreshAll();
    GeolocService.RefreshLoc();
    InitService.gaTrackEvent("App", "Refresh", "App refreshed", 1);
  };


  InitService.init();
  $scope.$storage = $localStorage;
  $scope.gares = LIB_GARE;
  $scope.TrajetsService = TrajetsService;
  $scope.InitService = InitService;
  TrajetsService.RefreshAll();

  // Phonegap event listener
  if(InitService.phonegap){
    document.addEventListener("resume", onResume, false);
  }
  // Desktop event listener
  $window.onfocus = function() {
    onResume();
  };

});

app.controller('HorairesCtrl',function( $scope, $localStorage, LIB_GARE){

})


app.controller('AgendaCtrl',function( $scope, $timeout, LIB_GARE, $filter, $localStorage, $ionicScrollDelegate, $ionicSlideBoxDelegate, $stateParams){
//console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);

	$scope.param = $scope.$storage.param;
  $scope.favoris = $localStorage.favoris;
  $scope.start = 0;
  $scope.nextpage = function(){
    $scope.start += 100;
    $ionicScrollDelegate.scrollTop(false);
  }   
  $scope.prevpage = function(){
    $scope.start -= 100;
    $ionicScrollDelegate.scrollBottom(false);
  }  
  $scope.gare = LIB_GARE;

  $scope.slideIndex = 0;
  $scope.oldindex = 0;
	$scope.today=Math.floor(new Date().getTime()/86400000);

  $scope.slideNext = function(){
    $ionicSlideBoxDelegate.next();
    $scope.filteredPage = $scope.newPage();
  } 

  $scope.slidePrevious = function(){
    $ionicSlideBoxDelegate.previous();
    $scope.filteredPage = $scope.newPage();
  } 

  $scope.newPage = function(){
    collection = $scope.gtfsTrajet.passages.train;
    var res = new Array;
    var train;
    var today=Math.floor(new Date().getTime()/86400000);
    var slideIndex = $scope.slideIndex;
    //console.log('fltre')
    if (collection===undefined) {
      return ;
    }
    else {
      for (var i=0, len=collection.length; i<len; i++) {
        train=collection[i];
        if ($filter('toDay')(train.valid.deb) >  today+slideIndex || $filter('toDay')(train.valid.fin) <today+slideIndex || (!!train.valid.moins && train.valid.moins.indexOf($filter('formatAddDate')  (slideIndex))>-1)) {
          // Do nothing
        }
        else {
          res.push(collection[i]);
        }
        //console.log("i : "+i+" len : " + len + " var : " +collection[i]['date']['jsdate'] + " / now : " +now);
      }
    }
     return res;
  }


  $scope.slideChanged = function(index){
    //console.log(index+' - '+$scope.oldindex % 3);
    //console.log(index-($scope.oldindex % 3));
    if(index-($scope.oldindex % 3)==-1 || index-($scope.oldindex % 3)==2){
      $scope.slideIndex = $scope.slideIndex-1;
    }
    else{
      $scope.slideIndex = $scope.slideIndex+1;
    }
    $scope.oldindex =  $scope.slideIndex;
    $scope.filteredPage = $scope.newPage();
  }
	
	if ($stateParams.id) {
		//console.log("id :"+$stateParams.id);
		//console.log($scope.param.trajet);
    $scope.idTrajet = $stateParams.id;
    $scope.trajetAgenda = _.find($localStorage.favoris, function(chr) { return chr.idTrajet = $scope.idTrajet; });
    $scope.gtfsTrajet = $localStorage.saveGtfs[$scope.idTrajet];
    $scope.filteredPage = $scope.newPage();
	}
  
})


app.controller('TrajetCtrl',function($scope, TrajetsService){
  $scope.trajet.display = TrajetsService.getDisplay();
})

app.controller('TrajetModif',function( $scope, $window, ApiService ){
   // Recherche des gares

     formatSpecial = function(text){
        if(text == undefined){text = ''};
        var res = text.replace(/[^a-z]/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a');
        return res;
     }

     $scope.specialCompare = function(text1, text2){
        if(text1 == undefined){text1 = ''};
        if(text2 == undefined){text2 = ''};
        var res1 = text1.toLowerCase().replace(/[^a-z]/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a');
        var res2 = text2.toLowerCase().replace(/[^a-z]/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a');
        r = res1.indexOf(res2);
        return r>=0;
     }

   $scope.getLocation = function(){
		//console.log('entered');
       if($scope.autoDepart && $scope.autoDepart.length > 0){
           $scope.DepartList =  {'name': 'Chargement ...'};
           $scope.autoShow = 1;
           $scope.autoTR3A = '';
           // DEPRECATED => local
           //DataSource.get($scope.refreshDepart,$scope.refreshDepartError, $scope.apiUrl+"autocomplete/"+$scope.autoDepart);
       }
       else{
           $scope.autoShow = 0;
       }
   };
   // Callback recherche de gares
   $scope.refreshDepart = function(data) {
       $scope.DepartList =  data;
       $scope.autoShow = 1;
       $scope.autoTR3A = '';
   }
   $scope.refreshDepartError = function(data) {
       $scope.autoShow = 0;
   }

   // Recherche des dessertes
   $scope.getDessertes = function(){
      // NEW
      ApiService.getDessertes($scope.trajet.depart)
        .then(function(data) {
          $scope.ListeDessertes = data;
        })
        .catch(function(error) {
          console.log(error);
        });
   };

   $scope.onSelect = function($item, $model, $label){
    $scope.trajet.depart=$scope.trajet.garedepart.code;
    $scope.trajet.arrivee = '0';
    $scope.getDessertes();
    console.log('yes');
   }
	
})


.controller("loginCtrl", function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {
  // Get a reference to the Firebase
  // TODO: Replace "ionic-demo" below with the name of your own Firebase
  var firebaseRef = new Firebase("https://nextt.firebaseio.com/");

  // Create a Firebase Simple Login object
  $scope.auth = $firebaseSimpleLogin(firebaseRef);

  // Initially set no user to be logged in
  $scope.user = null;

  // Logs a user in with inputted provider
  $scope.login = function(provider) {
    $scope.auth.$login(provider);
  };

  // Logs a user out
  $scope.logout = function() {
    $scope.auth.$logout();
  };

  // Upon successful login, set the user object
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    $scope.user = user;
  });

  // Upon successful logout, reset the user object
  $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
    $scope.user = null;
  });

  // Log any login-related errors to the console
  $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
    console.log("Error logging user in: ", error);
  });
});

