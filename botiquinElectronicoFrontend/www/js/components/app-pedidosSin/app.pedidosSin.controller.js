'use strict';

angular.module("app").controller("PedidosSinController", ['$http', '$scope', 'ApiService', 'Sesion', '$mdDialog', function($http, $scope, ApiService, Sesion, $mdDialog) {
    this.$onInit = function() {
        ApiService.getUserByUsername(Sesion.username).then(function (success) {
           $scope.idUsuario = success.data.id;
            ApiService.getPedidosSin($scope.idUsuario).then(function (success) {
                $scope.pedidosSin = success.data.results;
            });
        });
    };

    $scope.verProductos = function(id) {
        $scope.idSeleccionado = id;
        $scope.idProductosDePedidoSeleccionado = [];
        for(var pedido in $scope.pedidosSin) {
            if($scope.pedidosSin[pedido].id === id) {
                $scope.productosDePedido = $scope.pedidosSin[pedido].productos_en_stock;
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

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.verDetallesProducto = function(ev, id) {
        $scope.id = id;
        $mdDialog.show(
            $mdDialog.alert({
                template:   '<md-dialog-content>' +
                '<detalle-producto id="id"></detalle-producto>' +
                '</md-dialog-content>' +
                '<md-dialog-actions>\n' +
                '<md-button ng-click="closeDialog()" class="md-primary">Cerrar</md-button>\n' +
                '</md-dialog-actions>',
                scope: $scope,
                preserveScope: true
            })
                .clickOutsideToClose(true)
                .ariaLabel('Detalle')
                .parent(angular.element(document.querySelector('#rootElement')))
                .ok('Cerrar')
                .targetEvent(ev)
        );
    };
}]);