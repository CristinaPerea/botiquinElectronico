angular.module("app").service("ApiService", ["$http", "urls", "Sesion", function($http, urls, Sesion) {
    this.login = function(username, password) {
        json = {
            username: username,
            password: password
        };

        return $http.post(urls.protocol+"://"+urls.host+"/"+urls.rutaApiLogin, json);

    };

    this.logout = function() {
        return $http(creaPeticion('GET', urls.rutaApiLogout, undefined, undefined));
    };

    this.saveToken = function(token, username) {
        Sesion.token = token;
        Sesion.username = username;
        localStorage.setItem("Token", token);
        localStorage.setItem("Usuario", username);
    };

    this.getToken = function() {
        return Sesion.token;
    };

    this.getUser = function() {
        return Sesion.username;
    };

    this.clearLocalStorage = function() {
        localStorage.removeItem('Token');
        localStorage.removeItem('Usuario');
        Sesion.token = '';
        Sesion.username = '';
    };

    this.tieneSesion = function() {
        if(this.getToken() == undefined || this.getToken() == "" || this.getUser() == undefined || this.getUser() == "") {
            return false;
        } else {
            return true;
        }
    };

    this.checkToken = function() {
        if(this.getToken() == undefined || this.getToken() == "" || this.getUser() == undefined || this.getUser() == "") {
            if (localStorage.getItem("Token") !== null && localStorage.getItem("Usuario") !== null) {
                Sesion.token = localStorage.getItem("Token");
                Sesion.username = localStorage.getItem("Usuario");
            }
        }
    };

    this.getUserByUsername = function(username) {
        var peticion = creaPeticion('GET', urls.rutaApiBuscarUsername, null, username);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    this.getProducto = function (id) {
        return $http(creaPeticion('GET', urls.rutaApiProducto, null, id));
    };

    this.getProductoEnStock = function (idProducto) {
        var peticion = creaPeticion('GET', urls.rutaApiProductoEnStock, null, idProducto);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    this.getProspecto = function (termino) {
        var datos = {
            termino : termino
        };
        return $http(creaPeticion('POST', urls.rutaApiBuscaProspecto, datos, null));
    };

    this.getMedicamento = function (termino) {
        var datos = {
            termino : termino
        };
        return $http(creaPeticion('POST', urls.rutaApiBuscaMedicamento, datos, null));
    };
    
    this.getPedidosSin = function (idCliente) {
        var peticion = creaPeticion('GET', urls.rutaApiPedidosSinReceta, null, idCliente);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    this.getPedidosCon = function (idCliente) {
        var peticion = creaPeticion('GET', urls.rutaApiPedidosConReceta, null, idCliente);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    this.crearPedido = function (username) {
        return this.getUserByUsername(username).then(function (success) {
            var id = success.data.id;
            var datos = {
                cliente : id
            };
            return $http(creaPeticion('POST', urls.rutaCrearPedido, datos, null));
        });
    };
    function creaPeticion(metodo, ruta, datos, argumentoUrl) {
        var peticion = {};
        token = "Token " + Sesion.token;

        cabecera = {
            'Authorization' : token
        };

        url = (argumentoUrl == undefined) ? urls.protocol+"://"+urls.host+"/"+ruta : urls.protocol+"://"+urls.host+"/"+ruta+argumentoUrl+"/";
        if (datos == undefined) {
            peticion = {
                url:url,
                method: metodo,
                headers : cabecera
            };
        }
        else {
            peticion = {
                url:url,
                method: metodo,
                headers : cabecera,
                data : datos
            };
        }

        return peticion;
    }
}]);