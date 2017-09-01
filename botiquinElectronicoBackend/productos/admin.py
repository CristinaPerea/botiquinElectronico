from django.contrib import admin
from productos.models import Producto, ProductoEnStock, Pendiente

class ProductoEnStockAdmin(admin.ModelAdmin):
    model = ProductoEnStock
    search_fields = ('id_producto__nombre_producto', )
    list_filter = ('id_producto__con_receta',)
    raw_id_fields = ('id_pedido_con_receta', 'id_producto',)
    icon = '<i class="material-icons">assignment_turned_in</i>'


class ProductoAdmin(admin.ModelAdmin):
    model = Producto
    exclude = []
    search_fields = ('nombre_producto',)
    ordering = ['nombre_producto']
    icon = '<i class="material-icons">healing</i>'

class PendienteAdmin(admin.ModelAdmin):
    model = Pendiente
    exclude = []
    icon = '<i class="material-icons">assignment_late</i>'

admin.site.register(Producto, ProductoAdmin)
admin.site.register(ProductoEnStock, ProductoEnStockAdmin)
admin.site.register(Pendiente, PendienteAdmin)