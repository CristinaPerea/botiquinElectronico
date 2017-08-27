'use strict';

angular.module("app").controller("NuevoPedidoController", ['$http', '$scope', 'ApiService', 'Sesion', '$mdDialog', function($http, $scope, ApiService, Sesion, $mdDialog) {
    this.$onInit = function() {
        $scope.pedido = this.pedido;
    };



}]);