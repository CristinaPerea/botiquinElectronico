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
                    $scope.compruebaFechaExpiración();
                    $scope.fullRender = true;
                });
            });
        });

    };

    $scope.compruebaFechaExpiración= function () {
        var encontrado = false;
        var i = 0;
        while(i < $scope.pedidosCon[0].productos_en_stock.length && !encontrado) {
            var productoEnStock = $scope.pedidosCon[0].productos_en_stock[i];
            var fechaActual = $scope.formateaFecha(new Date());
            if (productoEnStock.fecha_expiracion === '2017-09-10'){
                $scope.showSimpleToast();
                encontrado = true;
            } else {
                i++;
            }
        }
    };

    $scope.formateaFecha = function (fecha) {
        var fechaActual = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
        return fechaActual;
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
                .textContent('¡Tienes productos de tu tratamiento por recoger!')
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