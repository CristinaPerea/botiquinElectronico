angular.module('app').config(function($stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');

    var home = {
        url: '/home',
        component: 'testComponent'
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

    var buscador = {
        url: '/buscador',
        component: 'buscadorProducto'
    };

    $stateProvider.state('home', home);
    $stateProvider.state('detalle', detalle);
    $stateProvider.state('buscador', buscador);
});