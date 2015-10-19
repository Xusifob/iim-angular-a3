angular.module('starter.controllers').controller('ModalCtrl', [
    '$scope', '$modalInstance','$modal','movie','TmdbService',
    function ($scope, $modalInstance,$modal,movie,TmdbService) {

        $scope.genres = [];

        $scope.baseImageUrl = 'http://image.tmdb.org/t/p/w500';

        for(var i=0;i<movie.genre_ids.length;i++){
            TmdbService.getGenre(movie.genre_ids[i]).then(function(data){
                $scope.genres.push(data.name);
            });
        }

        $scope.movie = movie;
    }
]);