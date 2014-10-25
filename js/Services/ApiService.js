function ApiService ($q, $http, InitService) {
	ApiObject = {};

	ApiObject.getGtfs = function (depart, arrivee) {
		var deferred = $q.defer();

		var url = InitService.apiUrl + ['gtfs', depart, arrivee].join('/');

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

		var url = InitService.apiUrl + ['mobil', depart, arrivee].join('/');

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

		var url = InitService.apiUrl + ['detail', numTrain].join('/');

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

		var url = InitService.apiUrl + 'refresh.txt';

		$http.get(url, {timeout:7000})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	ApiObject.getLastDessertes = function (depart) {
		var deferred = $q.defer();

		var url = InitService.apiUrl + ['dessertes', depart].join('/');

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