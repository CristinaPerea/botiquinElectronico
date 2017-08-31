"use strict";

angular.module('app').controller('AppCtrl', function ($scope, $timeout, $mdSidenav, ApiService, $state, Sesion) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.tengoToken = false;

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.$on('token', function(event, data) {
        if(data) {
            $scope.actualizarEstadoToken(data);
            ApiService.getUserByUsername(Sesion.username).then(function(success) {
                $scope.profile = success.data;
            });
            $state.go('home');
        }
    });

    $scope.logout = function() {
        ApiService.logout().then(function(success) {
            $scope.toggleLeft();
            ApiService.clearLocalStorage();
            $scope.actualizarEstadoToken(false);
        },
        function( resultado ) {
            $scope.toggleLeft();
            ApiService.clearLocalStorage();
            $scope.actualizarEstadoToken(false);
        });
    };

    $scope.actualizarEstadoToken = function(estado) {
        $scope.tengoToken = estado;
    };
});