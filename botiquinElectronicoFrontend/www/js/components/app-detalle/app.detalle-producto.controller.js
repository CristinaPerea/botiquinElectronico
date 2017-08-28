'use strict';

angular.module("app").controller("DetalleProductoController", ['$scope', '$mdSidenav', 'ApiService', '$sce', function($scope, $mdSidenav, ApiService, $sce) {

    // Función onInit del componente que hace una llamada a la API para devolver los prospectos del producto.
    this.$onInit = function() {
        ApiService.getProducto(this.id).then(function (success) {
            $scope.producto = success.data;
            var descripcion_html = $sce.trustAsHtml(success.data.descripcion_html);
            $scope.producto.descripcion_html_trusted = descripcion_html;
        });
    };

    // function buildToggler(componentId) {
    //     return function() {
    //         $mdSidenav(componentId).toggle();
    //     };
    // }
    // $scope.toggleLeft = buildToggler('left');
}]);