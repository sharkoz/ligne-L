
/* Controllers */


app.controller('AppCtrl',function( $scope, $location, $window, $localStorage, $ionicModal, Geomath, Locate, LIB_GARE, ApiService){
//console.log("Chargement du controller AppCtrl pour "+$scope.$id);
	// TODO : mettre dans app
	FastClick.attach(document.body);


    /** Lancer les analytics après le deviceReady */
	// TODO : mettre dans app
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		analytics();
	}
	
	// Phonegap event listener
	$document.addEventListener("resume", onResume, false);
	// Desktop event listener
	$window.onfocus = function() {
		onResume();
	};

    $scope.$on('$routeChangeSuccess', function(event, next, current) {
		  // Cacher le menu
		  $scope.modalShown=false;
		  $scope.route = next.route;
		  if ($scope.phonegap) {$scope.gaPlugin.trackPage(successHandler, errorHandler, $scope.route);};
    });
	
	// 1 - Get localstorage
    $scope.$storage = $localStorage;

    $scope.reloadRoute = function () {
        $route.reload();
    };

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
      $scope.$parent.detailloading = true;
      // NEW
      ApiService.getDetail($scope.train.longnum)
        .then(function(data) {
          $scope.getDetail(data);
        })
        .catch(function(error) {
          $scope.getDetailError(error)
        });
      // DEPRECATED
      //DataSource.get($scope.getDetail,$scope.getDetailError, $scope.apiUrl + "detail/" + $scope.train.longnum);
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
        $scope.detail = data;
        $scope.$parent.detailloading = false;
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
		$scope.trajet = trajet;
		//console.log("Agenda set on scope "+$scope.$id);
		$scope.slideIndex = 0;
	}
	  
});

app.controller('HorairesCtrl',function( $scope, LIB_GARE){
//console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);

    $scope.param = $scope.$storage.param;
    $scope.gare = LIB_GARE;


})


app.controller('AgendaCtrl',function( $scope, $timeout, LIB_GARE, $stateParams){
//console.log("Chargement du controller HorairesCtrl pour "+$scope.$id);

	$scope.param = $scope.$storage.param;

  $scope.gare = LIB_GARE;

	$scope.setAgenda = function (trajet) {
		$scope.trajet = trajet;
		//console.log("Agenda set on scope "+$scope.$id);
		//console.log(trajet);
		$scope.slideIndex = 0;
		$scope.slides=[];
		$scope.addSlides($scope.slides	, '', 2);
		$scope.$apply;
	}
	
    //console.log('init scope '+$scope.$id);
   $scope.$watch('slideIndex', function(newVal, oldVal, scope){
       if(newVal>$scope.slides.length-3){
           $scope.addSlide($scope.slides,'');
		   console.log('Added slide '+scope.slides.length);
		   }
       console.log('On slide '+newVal);
   }, true);
   
    $scope.addSlide = function (target, style) {
		var i = target.length;
		var date = new Date();
		var result = new Date(date);
		result.setDate(date.getDate() + i);
		target.push({
			label: 'slide #' + (i + 1),
			currDay: result.getFullYear()+'-'+('0'+(result.getMonth()+1)).substr(-2)+'-'+('0'+result.getDate()).substr(-2)
		});
		//console.log(target);
	}
	
	$scope.addSlides = function (target, style, qty) {
        for (var i=0; i < qty; i++) {
            $scope.addSlide(target, style);
        }
	}
	
	$scope.addDays = function (days) {
		var date = new Date();
		var result = new Date(date);
		result.setDate(date.getDate() + days);
		return result.toLocaleDateString();
	}
	
	$scope.slides=[];
	$scope.addSlides($scope.slides	, '', 2);
	$scope.slideIndex = 0;
	$scope.today=Math.floor(new Date().getTime()/86400000);
	//$scope.$apply;
	
	if ($stateParams.id) {
		//console.log("id :"+$routeParams.id);
		//console.log($scope.param.trajet);
        $scope.setAgenda($scope.param.trajet[$stateParams.id]);
	}
})


app.controller('TrajetCtrl',function( $scope, $window, ApiService, Getprevi ){
	//console.log("Chargement du controller TrajetCtrl pour "+$scope.$id);

    $scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);
	$scope.$on('LocRefreshed', function() {
		$scope.trajet.dist = $scope.calculateDistance($scope.trajet.depart_pos,$scope.pos);
	});

    $scope.getprevi = Getprevi.get;

	$scope.$on('Refresh', function() {
    // On anime le spin loader
    $scope.jsonloading = "spin_image";
    // Si les prévisions existent, on rafraichit asap
    if ($scope.trajet.save !== undefined) {
        $scope.trajet.previ = $scope.getprevi($scope.trajet.save, 15);
        // Si aucun live n'est dispo on affiche les prévisions, sinon on
        if($scope.dataSet === undefined) {
            $scope.trajet.display = $scope.trajet.previ;
        }
        else {
            $scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
        }
    }
    if ($localstorage.gtfs_refresh > $scope.trajet.savedate || isNaN($scope.trajet.savedate)) {
        // Si le gtfs n'est pas à jour on le telecharge
        // NEW
        ApiService.getGtfs($scope.trajet.depart, $scope.trajet.arrivee)
          .then(function(data) {
            $scope.saveData(data);
          })
          .catch(function(error) {
            $scope.saveDataError(error);
          });
        // DEPRECATED
        //DataSource.get($scope.saveData,$scope.saveDataError, $scope.apiUrl + "gtfs/" + $scope.trajet.depart + "/" + $scope.trajet.arrivee);
    }
    else {
        // Si les prévisions sont à jour on récupère juste le live
        $scope.jsoncall();
    }
	});



    // Callback fonction pour récupérer les horaires prévisionnels de la gare
    $scope.saveData = function(data) {
        $scope.trajet.save = data.passages;
        $scope.trajet.savedate = Math.floor(new Date().getTime()/1000);
        // Une fois que les horaires prévisionnels sont récupérés on récupère les horaires en temps réel
        $scope.jsoncall();
    }
    $scope.saveDataError = function(data) {
        //console.log(data);
        $scope.jsonloading = "";
		$scope.$parent.$parent.$broadcast('scroll.refreshComplete');
    }

    // Callback function pour les horaires en live
    $scope.setData = function(data) {
        //console.log('Données temps réel disponibles controller '+$scope.$id);
        $scope.trajet.previ = $scope.getprevi($scope.trajet.save, 15);
        $scope.dataSet = data.passages;
        $scope.trajet.display = merge($scope.dataSet.train, $scope.trajet.previ);
        $scope.jsonloading = "";
		$scope.$parent.$parent.$broadcast('scroll.refreshComplete');
    }
    $scope.setDataError = function(data) {
        console.log("Erreur recuperation des horaires en live");
        $scope.jsonloading = "";
		$scope.$parent.$parent.$broadcast('scroll.refreshComplete');
    }

    $scope.jsoncall = function(){$scope.jsonloading = "spin_image";
    // NEW
    ApiService.getLive($scope.trajet.depart, $scope.trajet.arrivee)
      .then(function(data) {
        $scope.setData(data);
      })
      .catch(function(error) {
        $scope.setDataError(error);
      });
    // DEPRECATED
    //DataSource.get($scope.setData,$scope.setDataError, $scope.apiUrl+$scope.trajet.path+"/"+$scope.trajet.depart+"/"+$scope.trajet.arrivee);};

    //Chaque trajet se rafraichit lui même
    $scope.$parent.$broadcast('Refresh');

	// Rafraichir tous les trajets
	$scope.broadcastRefresh = function () {
		$scope.$parent.$parent.$broadcast('Refresh');
	}

    // Supprimer un trajet
	$scope.rmTrajet = function(trajet){
		if($window.confirm('Voulez vous supprimer le trajet '+$scope.gare[trajet.depart]+' vers '+$scope.gare[trajet.arrivee]+' ?'))
		{
			$scope.cflip = ''; 
			$scope.$parent.param.trajet.splice($scope.$parent.param.trajet.indexOf(trajet),1); 
			$scope.options=!$scope.options;
            if ($scope.phonegap) {$scope.gaPlugin.trackEvent($scope.successHandler, $scope.errorHandler, "Trajet", "Delete", "Delete from Accueil", 1);};
			//TODO: toast notification
			//document.querySelector('#Suppr').show();
			$scope.$apply();
		}
	}
	
})




app.controller('TrajetModif',function( $scope, $window, ApiService ){
   // Recherche des gares
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
          $scope.refreshDessertes(data);
        })
        .catch(function(error) {
          $scope.refreshDessertesError(error);
        });
      // DEPRECATED
      //DataSource.get($scope.refreshDessertes,$scope.refreshDessertesError, $scope.apiUrl+"dessertes/"+$scope.trajet.depart);
   };
   // Callback dessertes
   $scope.refreshDessertes = function(data) {
       $scope.ListeDessertes = data;
       //console.log(data);
   }
   $scope.refreshDessertesError = function(data) {
       console.log(data);
   }

    // Rafraichir tous les trajets
    $scope.broadcastRefresh = function () {
        $scope.$parent.$parent.$broadcast('Refresh');
    }
	
	// Listener sur le champ de saisie de la gare de départ
	$scope.$watch('autoDepart', function(){
		if($scope.norefresh==1) {$scope.norefresh=0;}
		else {$scope.getLocation();}
	});
   
   
    // Supprimer un trajet
    $scope.rmTrajet = function(trajet){
        if($window.confirm('Voulez vous supprimer le trajet '+$scope.gare[trajet.depart]+' vers '+$scope.gare[trajet.arrivee]+' ?'))
        {
            $scope.cflip = '';
			$scope.lasttrajet=angular.copy($scope.$parent.param.trajet);
            $scope.$parent.param.trajet.splice($scope.$parent.param.trajet.indexOf(trajet),1);
            $scope.options=!$scope.options;
            if ($scope.phonegap) {$scope.gaPlugin.trackEvent($scope.successHandler, $scope.errorHandler, "Trajet", "Delete", "Delete from config", $scope.$parent.param.trajet.length);};
        }
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

