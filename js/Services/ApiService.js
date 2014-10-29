function ApiService ($q, $http, $localStorage) {
	ApiObject = {};

	ApiObject.getGtfs = function (depart, arrivee) {
		var deferred = $q.defer();

		var url = $localStorage.apiUrl + ['gtfs', depart, arrivee].join('/');

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	ApiObject.getLive = function (depart, arrivee) {
		var deferred = $q.defer();

		var url = $localStorage.apiUrl + ['mobil', depart, arrivee].join('/');

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	ApiObject.getDetail = function (numTrain) {
		var deferred = $q.defer();

		var url = $localStorage.apiUrl + ['detail', numTrain].join('/');

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	ApiObject.getLastRefresh = function () {
		var deferred = $q.defer();

		var url = $localStorage.apiUrl + 'refresh.txt';

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	ApiObject.getDessertes = function (depart) {
		var deferred = $q.defer();

		var url = $localStorage.apiUrl + ['dessertes', depart].join('/');

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	return ApiObject;
}
angular
.module('ligneL')
.factory('ApiService', ApiService);

/*
From controller:
ApiService.getGtfs()
	.then(function() {
		console.log('ok')
		callback()
	})
	.catch(function() {
		console.log('error')
	})
*/