"use strict";

angular.module("app", ['ngMaterial', 'ui.router']);

angular.module('app').run(function($rootScope, $mdSidenav) {
   $rootScope.$on('$locationChangeStart', function(event, next, current) {
       $mdSidenav('left').toggle();
   });
});