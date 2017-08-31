"use strict";

angular.module('app').component('listadoProductos', {
    templateUrl: '/www/js/components/app-listado/app.listado.html',
    controller: 'ListadoProductosController',
    bindings: {
        resultados: '<'
    }
});