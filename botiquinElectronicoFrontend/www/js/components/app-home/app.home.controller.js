'use strict';

angular.module("app").controller("HomeController", ['ApiService', '$scope', 'Sesion', function(ApiService, $scope, Sesion) {
    this.$onInit = function(){
        $scope.fullRender = false;
        ApiService.getUserByUsername(Sesion.username).then(function (success) {
            $scope.idUsuario = success.data.id;
            ApiService.getPedidosSin($scope.idUsuario).then(function (success) {
                $scope.pedidosSin = success.data.results;
                ApiService.getPedidosCon($scope.idUsuario).then(function (success) {
                    $scope.pedidosCon = success.data.results;
                    $scope.fullRender = true;
                });
            });
        });
    };
}]);