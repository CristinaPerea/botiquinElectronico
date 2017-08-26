angular.module("app").constant("urls", {
    "protocol" : "http",
    "host" : "localhost:8000",
    "rutaApiLogin" : "api/v1/login/",
    "rutaApiLogout" : "api/v1/logout/",
    "rutaApiBuscarUsername" : "api/v1/users/?search=",
    "rutaApiProducto" : "api/v1/productos/",
    "rutaApiBuscaProspecto" : "api/v1/busca_prospecto/",
    "rutaApiPedidosSinReceta" : "api/v1/pedidos_sin_receta/?cliente__id=",
    "rutaApiPedidosConReceta" : "api/v1/pedidos_con_receta/?cliente__id="
});