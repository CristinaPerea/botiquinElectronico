'use strict';

angular.module("app").controller("BuscadorMedicamentoController", ['$scope', 'ApiService', function($scope, ApiService) {

    // Función onInit del componente.
    this.$onInit = function() {
        $scope.termino = '';
        $scope.resultados = null;
        $scope.buscando = false;
        $scope.pedido = this.pedido;
        $scope.carrito = [];
    };

    // Función que hace una llamada a la API que devuelve todos los medicamentos que en su nombre contegan el término
    // de búsqueda.
    $scope.buscaMedicamento = function () {
        $scope.resultados = null;
        $scope.buscando = true;
        ApiService.getMedicamento($scope.termino).then(function (success) {
            $scope.resultados = success.data;
            $scope.buscando = false;
        });
    };

    // Función que introduce un producto al pedido sin receta. Existes 3 casos:
    // Primero se crea un pedido nuevo cada vez que se entra en la pantalla.
    // Caso 1: Que el producto no esté en productos en stock, en este caso, se ha de crear ese prodcuto dentro de
    // productos pendientes. El usuario verá el producto añadido a su pedido pero de otro color que los que sí están
    // en stock.
    // Caso 2: Que el producto esté en stock y sus propiedades "id_pedido_sin" e "id_pedido_con" estén a null,
    // esto significa que existe un producto que no tiene asociado ningún pedido, por tanto está disponible para el
    // usuario.
    // Caso 3: Que el prodcuto esté en stock, pero ya tenga una de las propiedades anteriores con un id de pedido
    // en este caso, se crea un nuevo producto en la lista de pendientes.
    $scope.seleccionProducto = function (id) {
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

    // Función que actualiza los prodcutos del pedido cuando el usuario quita o añade productos a su pedido.
    $scope.actualizaCarrito = function (productoEnStock, estaEnStock) {
        ApiService.getProducto(productoEnStock.id_producto).then(function (success) {
          var producto = success.data;
          producto.estaEnStock = estaEnStock;
          producto.idEnStock = productoEnStock.id;
          $scope.carrito.push(producto);
        });
    };

    // Función que borra el producto del stock
    $scope.borraDeStock = function(id) {
        ApiService.borraProductoEnStock(id).then(function(success) {
            console.log("Borrado " + id + " de stock");
            $scope.borraProductoDeCarrito(id);
        });
    };

    // Función que borra un producto de la lista de pendientes
    $scope.borraDePendientes = function(id) {
        ApiService.borraProductoEnPendientes(id).then(function(success) {
            console.log("Borrado " + id + " de pendientes");
            $scope.borraProductoDeCarrito(id);
        });
    };

    // Función que borra el producto del pedido de un usuario
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