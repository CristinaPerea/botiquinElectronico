angular.module('app').config(function($stateProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');

    var home = {
        url: '/home',
        component: 'testComponent'
    };

    var dos = {
        url: '/dos',
        component: 'testComponentDos'
    };

    $stateProvider.state('home', home);
    $stateProvider.state('dos', dos);
});