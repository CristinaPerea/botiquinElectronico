angular
    .module('app')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, ApiService, $state) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.tengoToken = false;

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

        $scope.$on('token', function(event, data) {
            if(data) {
                $scope.actualizarEstadoToken(data);
                $state.go('home');
            }
        });

        $scope.logout = function() {
            ApiService.logout().then(function(success) {
                $scope.toggleLeft();
                ApiService.clearLocalStorage();
                $scope.actualizarEstadoToken(false);
            },
            function( resultado ) {
                $scope.toggleLeft();
                ApiService.clearLocalStorage();
                $scope.actualizarEstadoToken(false);
            });
        };

        $scope.actualizarEstadoToken = function(estado) {
            $scope.tengoToken = estado;
        };
    });
