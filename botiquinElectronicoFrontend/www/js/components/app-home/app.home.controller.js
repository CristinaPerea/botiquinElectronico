'use strict';

angular.module("app").controller("HomeController", ['ApiService', '$scope', 'Sesion', '$mdToast', function(ApiService, $scope, Sesion, $mdToast) {
    this.$onInit = function(){
        $scope.fullRender = false;
        ApiService.getUserByUsername(Sesion.username).then(function (success) {
            $scope.idUsuario = success.data.id;
            ApiService.getPedidosSin($scope.idUsuario).then(function (success) {
                $scope.pedidosSin = success.data;
                ApiService.getPedidosCon($scope.idUsuario).then(function (success) {
                    $scope.pedidosCon = success.data;
                    $scope.fullRender = true;
                });
            });
        });
        $scope.showSimpleToast();
    };
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.showSimpleToast = function() {
        var pinTo = $scope.getToastPosition();

        $mdToast.show(
            $mdToast.simple()
                .textContent('¡Tienes productos por recoger de tus tratamientos!')
                .position(pinTo )
                .hideDelay(3000)
        );
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