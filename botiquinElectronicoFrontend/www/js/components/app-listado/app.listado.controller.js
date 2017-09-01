'use strict';

angular.module("app").controller("ListadoProductosController", ['$scope', 'ApiService', '$mdDialog', '$sce', function($scope, ApiService, $mdDialog, $sce) {

    // Función onInit del componente.
    this.$onInit = function() {
        $scope.resultados = this.resultados;
        for(var i=0; i < $scope.resultados.length; i++) {
            var descripcion_html = $sce.trustAsHtml($scope.resultados[i].descripcion);
            $scope.resultados[i].trustedDescripcion = descripcion_html;
        }
    };

    // Función que cierra el diálogo de detalle.
    $scope.closeDialog = function() {
        $mdDialog.hide();
    };
    // Función que abre el popup de detalles de un producto.
    $scope.abrirDetalle = function(ev, id) {
        $scope.id = id;
        $mdDialog.show(
            $mdDialog.alert({
                template:   '<md-dialog-content>' +
                                '<detalle-producto id="id"></detalle-producto>' +
                            '</md-dialog-content>' +
                            '<md-dialog-actions>\n' +
                                '<md-button ng-click="closeDialog()" class="md-primary">Cerrar</md-button>\n' +
                            '</md-dialog-actions>',
                scope: $scope,
                preserveScope: true
                })
                .clickOutsideToClose(true)
                .ariaLabel('Detalle')
                .parent(angular.element(document.querySelector('#rootElement')))
                .ok('Cerrar')
                .targetEvent(ev)
        );
    };
}]);