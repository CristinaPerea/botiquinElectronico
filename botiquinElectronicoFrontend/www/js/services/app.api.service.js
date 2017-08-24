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