'use strict';

angular.module("app").controller("HomeController", ['ApiService', '$scope', 'Sesion', '$mdToast', function(ApiService, $scope, Sesion, $mdToast) {

    // Función onInit del componente. En ella se piden los pedidos sin receta y los pedidos con receta dado un usuario.
    // También se llama a la función toast en los pedidos con receta.
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

    // Función que comprueba si existe algún producto del tratamiento actual que tenga la fecha de expiración igual
    // a la fecha de hoy. Esta función mostrará un toast si encuentra un producto que cumpla esta condición.
    $scope.compruebaFechaExpiración= function () {
        var encontrado = false;
        var i = 0;
        while(i < $scope.pedidosCon[0].productos_en_stock.length && !encontrado) {
            var productoEnStock = $scope.pedidosCon[0].productos_en_stock[i];
            var fechaActual = $scope.formateaFecha(new Date());
            if (productoEnStock.fecha_expiracion === fechaActual){
                $scope.showSimpleToast();
                encontrado = true;
            } else {
                i++;
            }
        }
    };

    // Función que formatea la fecha actual al formanto yyyy-MM-dd
    $scope.formateaFecha = function (fecha) {
        var fechaActual = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
        return fechaActual;
    };

    // Código relacionado con el toast (De línea 44 a línea 81)
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