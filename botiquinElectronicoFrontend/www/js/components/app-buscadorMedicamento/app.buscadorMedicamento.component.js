angular.module('app').component('buscadorMedicamento', {
    templateUrl: '/www/js/components/app-buscadorMedicamento/app.buscadorMedicamento.html',
    controller: 'BuscadorMedicamentoController',
    bindings: {
        pedido: '<'
    }
});