'use strict';
angular.module('starter.services').service('TmdbService', [ '$q', '$http',
  function ($q, $http) {

    var baseUrl = 'http://api.themoviedb.org/3';
    var apiKey = '2ab523578f2edd5c0fb434eabd66830e';

    var tmdbService = {
      // METHODS
      getPopular: function (pagination,sortby) {

        var q = $q.defer();

        $http({
          method: 'GET',
          url: baseUrl + '/discover/movie',
          params: {
            api_key: apiKey,
            page : pagination,
            sort_by : sortby,
            include_adult : false,
          }
        }).then(
            function success(response) {
              var movies = response.data.results;
              q.resolve(movies);

            });
        return q.promise;
      },

      search: function (searchTerm) {

        var q = $q.defer();

        $http({
          method: 'GET',
          url: baseUrl + '/search/movie',
          params: {
            api_key: apiKey,
            query: searchTerm
          }
        }).then(
            function success(response) {
          var movies = response.data.results;
          q.resolve(movies);

        });
        return q.promise;

      },

      getGenre: function (genreId) {

        var q = $q.defer();

        $http({
          method: 'GET',
          url: baseUrl + '/genre/' + genreId,
          params: {
            api_key: apiKey
          }
        }).then(
            function success(response) {
          var genre = response.data;
          q.resolve(genre);

        });
        return q.promise;

      },
    };
    return tmdbService;
  }
]);