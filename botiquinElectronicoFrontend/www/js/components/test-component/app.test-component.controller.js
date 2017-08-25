'use strict';

angular.module("app").controller("TestController", ['$http', '$scope', '$mdSidenav', function($http, $scope, $mdSidenav) {
    this.$onInit = function() {
        console.log('Llego al testComponent');
    };

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }
    $scope.toggleLeft = buildToggler('left');
}]);