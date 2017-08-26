angular.module('app').component('listadoPedidos', {
    templateUrl: '/www/js/components/app-listadoPedidos/app.listadoPedidos.html',
    controller: 'ListadoPedidosController',
    bindings: {
        pedidos: '<'
    }
});