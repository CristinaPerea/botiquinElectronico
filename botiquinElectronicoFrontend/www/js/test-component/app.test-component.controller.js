'use strict';

angular.module("angularTest").controller("TestController", ['$http', '$scope', function($http, $scope) {
    $scope.cliente = '';
    var token = "Token " + "5e3159f21c3aed580adebb658e549e0b6f87c447";

    var cabecera = {
        'Authorization' : token
    };
    var peticion = {
        url: 'http://127.0.0.1:8000/api/v1/users/',
        method: 'GET',
        headers : cabecera
    };
    $http(peticion).then(function(success) {
        success.data[0].nuevoMensaje = "amolsito!";
        $scope.cliente = success.data;
    });
}]);