'use strict';

angular.module("app").controller("BuscadorMedicamentoController", ['$scope', 'ApiService', function($scope, ApiService) {

    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
        $scope.pedido = this.pedido;
        console.log($scope.pedido);
    };

    $scope.buscaMedicamento = function () {
        $scope.resultados = null;
        $scope.buscando = true;
        ApiService.getMedicamento($scope.termino).then(function (success) {
            $scope.resultados = success.data;
            $scope.buscando = false;
        });
    };

    $scope.seleccionProducto = function (id) {
      console.log(id);
      ApiService.getProductoEnStock(id).then(function (success) {
         console.log(success.data);
         if (success.data.length === 0) {
             console.log("este medicamento no está en stock");
         } else {
             for (var producto in success.data) {
                 if ((success.data[producto].id_pedido_con_receta) === null && (success.data[producto].id_pedido_sin_receta) === null) {
                     console.log(success.data[producto]);
                 }
             }
         }
      });

    };
}]);