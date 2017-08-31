'use strict';

angular.module("app").controller("NuevoPedidoController", ['$http', '$scope', 'ApiService', 'Sesion', '$mdDialog', '$state', function($http, $scope, ApiService, Sesion, $mdDialog, $state) {
    this.$onInit = function() {
        $scope.pedido = this.pedido;
    };

    // Función que devuelve al usuario a la pantalla de histórico de pedidos
    $scope.goHome = function () {
        $state.go('home');
    };
}]);