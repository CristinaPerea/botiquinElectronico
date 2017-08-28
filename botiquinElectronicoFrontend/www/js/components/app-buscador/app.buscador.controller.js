'use strict';

angular.module("app").controller("BuscadorProductoController", ['$scope', 'ApiService', function($scope, ApiService) {

    // Función onInit del componente.
    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
    };

    // Función que realiza una llamada a la API con el término de búsqueda que se le ha pasado por el buscador.
    $scope.buscaProducto = function () {
        $scope.resultados = null;
        $scope.buscando = true;
        ApiService.getProspecto($scope.termino + '*').then(function (success) {
            $scope.resultados = success.data;
            $scope.buscando = false;
        });
    }
}]);