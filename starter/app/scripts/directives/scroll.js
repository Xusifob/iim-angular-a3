angular.module('starter.directives')

    .directive("scroll", function ($window) {
        return function($scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if(this.pageYOffset >= element[0].offsetHeight - 1000)
                    $scope.popularPage++;

                $scope.$apply();
            });
        };
    });