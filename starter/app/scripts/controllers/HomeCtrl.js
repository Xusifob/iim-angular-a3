angular.module('starter.controllers').controller('HomeCtrl', [
  '$scope','$timeout','TmdbService','$modal',
  function ($scope,$timeout,TmdbService,$modal) {


    // Get all movies
    $scope.movies = (window.localStorage.getItem('movies') === null || window.localStorage.getItem('movies') === 'undefined') ? [] : JSON.parse(window.localStorage.getItem('movies'));


    // Display vars
    $scope.displaySuccessAdd = false;
    $scope.displayErrorAdd = false;
    $scope.displaySuccessRemove = false;

    $scope.searchTerm = '';
    $scope.popularMovies = [];
    $scope.popularPage = 1;

    $scope.order_by = 'popularity.desc';


    // Base URL for images
    $scope.baseImageUrl = 'http://image.tmdb.org/t/p/w500';


    $scope.getNumber = function(num) {
      return new Array(num);
    };

    //Function search
    $scope.search =  function(searchTerm){
      if(searchTerm != '')
        TmdbService.search(searchTerm).then(function(data){

          $scope.searchResults = data;
          $scope.searchTerm = '';
        });
    };

    $scope.$watchCollection('movies',function(){

      // Add the localstorage
      window.localStorage.setItem('movies',JSON.stringify($scope.movies));
    });


    $scope.$watch('searchTerm', function() {
      if($scope.searchTerm.length >= 3)
        TmdbService.search($scope.searchTerm).then(function(data){
          $scope.searchResults = data;
        });
    });

    // Watch on scroll
    $scope.$watch('popularPage', displayPopulars);


    function displayPopulars(){
      TmdbService.getPopular($scope.popularPage,$scope.order_by).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          if(data[i].poster_path !== null){

            var indexArray = inArray(data[i].original_title,$scope.movies);
            data[i].checked = false !== indexArray;

            if(data[i].checked)
              data[i].seen = $scope.movies[indexArray].seen;


            $scope.popularMovies.push(data[i]);
          }
        }
      });
    }


    // Watch on scroll
    $scope.$watch('order_by', function() {
      $scope.popularPage = 1;
      $scope.popularMovies = [];
      displayPopulars();
    });



    $scope.modalOpen = function(movie){
      $modal.open({
        animation: true,
        templateUrl: 'templates/modal.html',
        controller: 'ModalCtrl',
        resolve: {
          movie: function () {
            return movie;
          }
        }
      });
    };


    $scope.addItems = function(item,index){


      if(index !== undefined)
        $scope.popularMovies[index].checked = true;


      if(item !== '' && false === inArray(item,$scope.movies)){
        $scope.movies.push(
            {title : item,seen : false}
        );

        // Add the localstorage
        window.localStorage.setItem('movies',JSON.stringify($scope.movies));

        $scope.itemToAdd = '';

        // Display the alert
        $scope.displaySuccessAdd = true;
      }else
        $scope.displayErrorAdd = true;

      $timeout(hideAlert, 3000);
    };

    $scope.removeItem = function(item,index){

      if(index !== undefined)
        $scope.popularMovies[index].checked = false;

      delete $scope.movies.splice(inArray(item,$scope.movies),1);
      window.localStorage.setItem('movies',JSON.stringify($scope.movies));
      $scope.displaySuccessRemove = true;
      $timeout(hideAlert,3000);
    };

    function hideAlert(){
      $scope.displayErrorAdd = false;
      $scope.displaySuccessAdd = false;
      $scope.displaySuccessRemove = false;
    }

    function inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
        if(haystack[i].title == needle) return i;
      }
      return false;
    }

  }
]);