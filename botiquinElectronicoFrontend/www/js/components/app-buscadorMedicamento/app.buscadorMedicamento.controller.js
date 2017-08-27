'use strict';

angular.module("app").controller("BuscadorMedicamentoController", ['$scope', 'ApiService', function($scope, ApiService) {

    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
        $scope.pedido = this.pedido;
        $scope.carrito = [];
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
          // Se busca el producto por su id en la api de productos en stock
          // Si no se encuentra el producto, se debe crear en la api de prodcutos pendientes
         //console.log(success.data);
         if (success.data.length === 0) {
             ApiService.creaPendiente($scope.pedido.fecha_pedido, id, $scope.pedido.id).then(function (success) {
                $scope.resultado = 'Su producto está pendiente de stock';
                 $scope.actualizaCarrito(success.data, false);
             });
         } else {
             var encontrado = false;
             var i = 0;
             while (i < success.data.length && !encontrado) {
                 if ((success.data[i].id_pedido_con_receta) === null && (success.data[i].id_pedido_sin_receta) === null) {
                     console.log(success.data[i]);
                     encontrado = true;
                     ApiService.meteProductoAPedido($scope.pedido.id, success.data[i].id).then(function (success) {
                         $scope.resultado = 'Su producto se ha introducido';
                         $scope.actualizaCarrito(success.data, true);
                     })
                 } else {
                     i++;
                 }
             }
             if (!encontrado) {
                 ApiService.creaPendiente($scope.pedido.fecha_pedido, id, $scope.pedido.id).then(function (success) {
                     $scope.resultado = 'Su producto está pendiente de stock';
                     $scope.actualizaCarrito(success.data, false);
                 });
             }
         }
      });
    };

    $scope.actualizaCarrito = function (productoEnStock, estaEnStock) {
        ApiService.getProducto(productoEnStock.id_producto).then(function (success) {
          var producto = success.data;
          producto.estaEnStock = estaEnStock;
          producto.idEnStock = productoEnStock.id;
          $scope.carrito.push(producto);
        });
    };

    $scope.borraDeStock = function(id) {
        ApiService.borraProductoEnStock(id).then(function(success) {
            console.log("Borrado " + id + " de stock");
            $scope.borraProductoDeCarrito(id);
        });
    };

    $scope.borraDePendientes = function(id) {
        ApiService.borraProductoEnPendientes(id).then(function(success) {
            console.log("Borrado " + id + " de pendientes");
            $scope.borraProductoDeCarrito(id);
        });
    };

    $scope.borraProductoDeCarrito = function(id) {
        var encontrado = false;
        var i = 0;

        while(i < $scope.carrito.length && !encontrado) {
            if ($scope.carrito[i].idEnStock === id) {
                $scope.carrito.splice(i, 1);
                encontrado = true;
            } else {
                i++;
            }
        }
    };

}]);