from django.contrib import admin
from productos.models import Producto, ProductoEnStock, Pendiente

# class ProductosEnStockInLine(admin.TabularInline):
#     model = ProductoEnStock
#

class ProductoEnStockAdmin(admin.ModelAdmin):
    model = ProductoEnStock
    raw_id_fields = ('id_pedido_con_receta', 'id_producto',)

class ProductoAdmin(admin.ModelAdmin):
    model = Producto
    exclude = []
    search_fields = ('nombre_producto',)

admin.site.register(Producto, ProductoAdmin)
admin.site.register(ProductoEnStock, ProductoEnStockAdmin)
admin.site.register(Pendiente)