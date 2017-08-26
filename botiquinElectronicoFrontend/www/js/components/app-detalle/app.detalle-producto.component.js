angular.module('app').component('detalleProducto', {
    templateUrl: '/www/js/components/app-detalle/app.detalle-producto.html',
    controller: 'DetalleProductoController',
    bindings: {
        id: '<'
    }
});