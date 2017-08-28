'use strict';

angular.module("app").controller("NuevoPedidoController", ['$http', '$scope', 'ApiService', 'Sesion', '$mdDialog', '$state', function($http, $scope, ApiService, Sesion, $mdDialog, $state) {
    this.$onInit = function() {
        $scope.pedido = this.pedido;
    };

    $scope.goHome = function () {
        console.log('Vuelvo al home');
        $state.go('home');
    };
}]);