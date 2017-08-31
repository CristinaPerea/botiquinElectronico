'use strict';

angular.module("app").controller("LoginController", ['$scope', '$http', 'ApiService', '$mdToast', function($scope, $http, ApiService, $mdToast) {

    // Función onInit del componente, comprueba que el usuario tiene sesión
    this.$onInit = function() {
        ApiService.checkToken();
        if (ApiService.tieneSesion()) {
            $scope.$emit('token', true);
        }
        $scope.muestraFormularioRegistro = false;
        $scope.crearusuario = {};
        $scope.erroresCreandoUsuario = {};
        $scope.erroresLogeando = {};
    };

    $scope.muestraFormulario = false;

    // Función que muestra el formulario de login
    $scope.muestraLogin = function() {
        $scope.muestraFormulario = !$scope.muestraFormulario;
        $scope.muestraFormularioRegistro = false;
    };

    $scope.muestraRegistro = function() {
        $scope.muestraFormulario = false;
        $scope.muestraFormularioRegistro = true;
    };

    $scope.creaUsuario = function() {
        $scope.erroresCreandoUsuario = {};
        ApiService.creaUsuario($scope.crearusuario).then(function(success) {
            $scope.showSimpleToast();
            $scope.user.name = $scope.crearusuario.username;
            $scope.user.password = $scope.crearusuario.password;
            $scope.crearusuario = {};
            $scope.muestraLogin();
        }, function(error) {
            Object.keys(error.data).forEach(function(key) {
                $scope.erroresCreandoUsuario[key] = error.data[key];
            });
        });
    };

    $scope.user = {};

    // Función que realiza el login del usuario con los datos pasados en el formulario
    $scope.login = function() {
        $scope.erroresLogeando = {};
        ApiService.login($scope.user.name, $scope.user.password).then(function(success) {
            $scope.token = success.data.token;
            ApiService.saveToken($scope.token, $scope.user.name);
            $scope.$emit('token', true);
        }, function(error) {
            Object.keys(error.data).forEach(function(key) {
                $scope.erroresLogeando[key] = error.data[key];
            });
        });
    };

    // Código relacionado con el toast
    $scope.showSimpleToast = function() {
        var pinTo = $scope.getToastPosition();

        $mdToast.show(
            $mdToast.simple()
                .textContent('¡Usuario creado con éxito!')
                .position(pinTo )
                .hideDelay(3000)
        );
    };

    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;

        last = angular.extend({},current);
    }
}]);

