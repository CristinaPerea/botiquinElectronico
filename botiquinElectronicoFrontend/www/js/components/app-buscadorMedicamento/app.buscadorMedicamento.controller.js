'use strict';

angular.module("app").controller("BuscadorMedicamentoController", ['$scope', 'ApiService', function($scope, ApiService) {

    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
    };

    $scope.buscaMedicamento = function () {
        $scope.resultados = null;
        $scope.buscando = true;
        ApiService.getMedicamento($scope.termino).then(function (success) {
            $scope.resultados = success.data;
            $scope.buscando = false;
        });
    }
}]);