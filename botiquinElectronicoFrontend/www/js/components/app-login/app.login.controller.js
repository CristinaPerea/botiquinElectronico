'use strict';

angular.module("app").controller("LoginController", ['$scope', '$http', 'ApiService', function($scope, $http, ApiService) {

    // Función onInit del componente, comprueba que el usuario tiene sesión
    this.$onInit = function() {
        ApiService.checkToken();
        if (ApiService.tieneSesion()) {
            $scope.$emit('token', true);
        }
    };

    $scope.muestraFormulario = false;

    // Función que muestra el formulario de login
    $scope.muestraLogin = function() {
        $scope.muestraFormulario = !$scope.muestraFormulario;
    };

    $scope.user = {};

    // Función que realiza el login del usuario con los datos pasados en el formulario
    $scope.login = function() {
        ApiService.login($scope.user.name, $scope.user.password).then(function(success) {
            $scope.token = success.data.token;
            // ApiService.saveToken($scope.user.name, $scope.token);
            ApiService.saveToken($scope.token, $scope.user.name);
            var auth = 'Token ' + $scope.token;
            var cabecera = {
                Authorization: auth
            };
            var peticion = {
                url: 'http://127.0.0.1:8000/api/v1/users/',
                method: 'GET',
                headers: cabecera
            };

            $http(peticion).then(function (success) {
                $scope.resultado = success.data;
                console.log($scope.resultado);
            });
            $scope.$emit('token', true);
        });
    }
}]);

