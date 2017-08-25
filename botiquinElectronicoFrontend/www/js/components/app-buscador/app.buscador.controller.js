'use strict';

angular.module("app").controller("BuscadorProductoController", ['$scope', 'ApiService', function($scope, ApiService) {

    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
    };

    $scope.buscaProducto = function () {
        $scope.resultados = null;
        $scope.buscando = true;
        ApiService.getProspecto($scope.termino + '*').then(function (success) {
            $scope.resultados = success.data;
            $scope.buscando = false;
        });
    }
}]);