'use strict';

angular.module("app").controller("TestControllerDos", ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
    this.$onInit = function() {
        console.log('Llego al testComponent dos');
    };

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }
    $scope.toggleLeft = buildToggler('left');
}]);