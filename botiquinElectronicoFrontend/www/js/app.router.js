angular.module('app').config(function($stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');

    var home = {
        url: '/home',
        component: 'homeComponent'
    };

    var detalle = {
        url: '/detalle/:id',
        component: 'detalleProducto',
        resolve: {
           id: function($stateParams) {
               return $stateParams.id;
           }
        }
    };

    var crearPedido = {
        url: '/crearPedido',
        component: 'nuevoPedido',
        resolve: {
            pedido: function (ApiService, Sesion) {
                return ApiService.crearPedido(Sesion.username).then(function (success) {
                    return success.data;
                })
            }
        }
    };
    var buscador = {
        url: '/buscador',
        component: 'buscadorProducto'
    };

    $stateProvider.state('home', home);
    $stateProvider.state('detalle', detalle);
    $stateProvider.state('buscador', buscador);
    $stateProvider.state('crearPedido', crearPedido);
});