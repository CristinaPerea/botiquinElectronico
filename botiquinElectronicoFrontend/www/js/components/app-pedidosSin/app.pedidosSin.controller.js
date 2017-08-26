'use strict';

angular.module("app").controller("PedidosSinController", ['$http', '$scope', 'ApiService', 'Sesion', function($http, $scope, ApiService, Sesion) {
    this.$onInit = function() {
        ApiService.getUserByUsername(Sesion.username).then(function (success) {
           $scope.idUsuario = success.data.id;
           console.log($scope.idUsuario);
            ApiService.getPedidosSin($scope.idUsuario).then(function (success) {
                $scope.pedidosSin = success.data.results;
                // console.log($scope.pedidosSin);
            });
        });
    };

    $scope.verProductos = function(id) {
        $scope.idSeleccionado = id;
        $scope.idProductosDePedidoSeleccionado = [];
        for(var pedido in $scope.pedidosSin) {
            if($scope.pedidosSin[pedido].id === id) {
                $scope.productosDePedido = $scope.pedidosSin[pedido].productos_en_stock;
                console.log($scope.productosDePedido);
                for(var producto in $scope.productosDePedido){
                    $scope.idProductosDePedidoSeleccionado.push($scope.productosDePedido[producto].id_producto);
                }
            }
        }
        $scope.productosDePedidoSeleccionado = [];
        for(var i = 0; i < $scope.idProductosDePedidoSeleccionado.length; i++) {
            var idProducto = $scope.idProductosDePedidoSeleccionado[i];
            ApiService.getProducto(idProducto).then(function(success) {
                var producto = {
                    id: success.data.id,
                    nombre: success.data.nombre_producto
                };

                $scope.productosDePedidoSeleccionado.push(producto);
            });
        }
    };
}]);