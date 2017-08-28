'use strict';

angular.module("app").controller("ListadoPedidosController", ['$http', '$scope', 'ApiService', 'Sesion', '$mdDialog', function($http, $scope, ApiService, Sesion, $mdDialog) {

    // Función onInit del componente
    this.$onInit = function() {
        $scope.pedidos = this.pedidos;
    };

    // Función que muestra los pedidos asociados a un usuario y también los productos que tienen dichos pedidos
    $scope.verProductos = function(id) {
        $scope.idSeleccionado = id;
        $scope.idProductosDePedidoSeleccionado = [];
        for(var pedido in $scope.pedidos) {
            if($scope.pedidos[pedido].id === id) {
                $scope.productosDePedido = $scope.pedidos[pedido].productos_en_stock;
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
        // Productos de un pedido que se encuentran en la lista de pendientes
        $scope.productosDePedidoSeleccionadoEnPendientes = [];
        ApiService.getProductosDePedidosSinRecetaEnPendiente(id).then(function (success) {
            for(var i = 0; i < success.data.length; i++) {
                var idProducto = success.data[i].id_producto;
                ApiService.getProducto(idProducto).then(function(success) {
                    var producto = {
                        id: success.data.id,
                        nombre: success.data.nombre_producto
                    };
                    $scope.productosDePedidoSeleccionadoEnPendientes.push(producto);
                });
            }
        });
    };

    // Función que cierra el popup de detalle
    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    // Función para ver los detalles de un prodcuto dado un id ( abre un popup)
    $scope.verDetallesProducto = function(ev, id) {
        console.log('Entro en detalle de producto');
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
