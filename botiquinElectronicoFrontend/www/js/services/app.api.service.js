angular.module("app").service("ApiService", ["$http", "urls", "Sesion", function($http, urls, Sesion) {

    // Llamada a la API para hacer el login en la aplicación con las credenciales
    this.login = function(username, password) {
        json = {
            username: username,
            password: password
        };
        return $http.post(urls.protocol+"://"+urls.host+"/"+urls.rutaApiLogin, json);
    };

    // Llamada a la API para hacer el logout en la aplicación
    this.logout = function() {
        return $http(creaPeticion('GET', urls.rutaApiLogout, undefined, undefined));
    };

    // Función que guarda el Token de sesión del usuario
    this.saveToken = function(token, username) {
        Sesion.token = token;
        Sesion.username = username;
        localStorage.setItem("Token", token);
        localStorage.setItem("Usuario", username);
    };

    // Función que devuelve el Token de sesión
    this.getToken = function() {
        return Sesion.token;
    };

    // Función que devuelve el usuario que está logueado
    this.getUser = function() {
        return Sesion.username;
    };

    // Función que elimina al usuario y el Token del mismo del Local Storage
    this.clearLocalStorage = function() {
        localStorage.removeItem('Token');
        localStorage.removeItem('Usuario');
        Sesion.token = '';
        Sesion.username = '';
    };

    // Función que devuelve True o False si el usuario tiene sesión activa
    this.tieneSesion = function() {
        if(this.getToken() == undefined || this.getToken() == "" || this.getUser() == undefined || this.getUser() == "") {
            return false;
        } else {
            return true;
        }
    };

    // Función que guarda el nombre de usuario y el token en el local storage
    this.checkToken = function() {
        if(this.getToken() == undefined || this.getToken() == "" || this.getUser() == undefined || this.getUser() == "") {
            if (localStorage.getItem("Token") !== null && localStorage.getItem("Usuario") !== null) {
                Sesion.token = localStorage.getItem("Token");
                Sesion.username = localStorage.getItem("Usuario");
            }
        }
    };

    // Función que devuelve el objeto usuario pasándole como parámetro el username del mismo
    this.getUserByUsername = function(username) {
        var peticion = creaPeticion('GET', urls.rutaApiBuscarUsername, null, username);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    // Función que devuelve un producto dado el id del mismo
    this.getProducto = function (id) {
        return $http(creaPeticion('GET', urls.rutaApiProducto, null, id));
    };

    // Función que devuelve un producto en stock dado el id de un producto
    this.getProductoEnStock = function (idProducto) {
        var peticion = creaPeticion('GET', urls.rutaApiProductoEnStock, null, idProducto);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    // Función que devuelve los productos los cuales su prospecto contiene el término o terminos pasados como parámento
    this.getProspecto = function (termino) {
        var datos = {
            termino : termino
        };
        return $http(creaPeticion('POST', urls.rutaApiBuscaProspecto, datos, null));
    };

    // Función que devuelve los productos cuyo nombre contiene el término que se le pasa como parámetro
    this.getMedicamento = function (termino) {
        var datos = {
            termino : termino
        };
        return $http(creaPeticion('POST', urls.rutaApiBuscaMedicamento, datos, null));
    };

    // Función que devuelve todos los pedidos sin recetas asociados a un cliente, cuyo id se le pasa como prámetro
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
            return $http(creaPeticion('POST', urls.rutaApiCrearPedido, datos, null));
        });
    };

    this.getProductosDePedidosSinRecetaEnPendiente = function(idPedido) {
        var peticion = creaPeticion('GET', urls.rutaApiPendientesPorIdDePedidoSinReceta, null, idPedido);
        peticion.url = peticion.url.slice(0,-1);
        return $http(peticion);
    };

    this.meteProductoAPedido = function (idPedidoSin, idProductoEnStock) {
        var datos = {
            "id_pedido_sin_receta": idPedidoSin
        };
        var peticion = creaPeticion('PUT', urls.rutaApiProdcutoEnStockId, datos, idProductoEnStock);
        return $http(peticion);
    };

    this.borraProductoEnStock = function(idProductoEnStock) {
        return $http(creaPeticion('DELETE', urls.rutaApiProdcutoEnStockId, null, idProductoEnStock));
    };

    this.borraProductoEnPendientes = function(idProductoEnPendientes) {
        return $http(creaPeticion('DELETE', urls.rutaApiCrearPendiente, null, idProductoEnPendientes));
    };



    this.creaPendiente = function (fechaPedido, idProducto, idPedidoSin) {
      var datos = {
          "fecha_pedido": fechaPedido,
          "id_producto": idProducto,
          "id_pedido_con_receta": null,
          "id_pedido_sin_receta": idPedidoSin
      };
      var peticion = creaPeticion('POST', urls.rutaApiCrearPendiente, datos, null);
      return $http(peticion);
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