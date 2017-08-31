"use strict";

angular.module('app').component('nuevoPedido', {
    templateUrl: '/www/js/components/app-nuevoPedido/app.nuevoPedido.html',
    controller: 'NuevoPedidoController',
    bindings: {
        pedido: '<'
    }
});