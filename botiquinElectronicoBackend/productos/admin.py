from django.contrib import admin
from productos.models import Producto, ProductoEnStock, Pendiente

# class ProductosEnStockInLine(admin.TabularInline):
#     model = ProductoEnStock
#
# class ProductoAdmin(admin.ModelAdmin):
#     inlines = [ProductosEnStockInLine, ]

admin.site.register(Producto)
admin.site.register(ProductoEnStock)
admin.site.register(Pendiente)