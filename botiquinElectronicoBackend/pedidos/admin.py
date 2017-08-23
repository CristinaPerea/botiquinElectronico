from django.contrib import admin
from pedidos.models import PedidosSinReceta, PedidosConReceta
from django import forms

from productos.models import ProductoEnStock

admin.site.register(PedidosSinReceta)

class ProductoEnStockInline(admin.TabularInline):
    model = ProductoEnStock
    exclude = ['id_pedido_sin_receta']

    # def __init__(self, *args, **kwargs):
    #     super(ProductoEnStockInline, self).__init__(*args, **kwargs)
    #
    # def get_queryset(self, request):
    #     queryset = ProductoEnStock.objects.filter(id_producto__con_receta=True)
    #     return queryset
    # def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
    #     """enable ordering drop-down alphabetically"""
    #     if db_field.name == 'id_pedido_sin_receta':
    #         kwargs['queryset'] = ProductoEnStock.objects.filter(id_producto__con_receta=True)
    #     return super(ProductoEnStockInline, self).formfield_for_foreignkey(db_field, request, **kwargs)
    # def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
    #     field = super(ProductoEnStockInline, self).formfield_for_foreignkey(db_field, request, **kwargs)
    #     if db_field.name == 'id_producto':
    #         field.queryset = field.queryset.filter(con_receta=True)
    #     return field


# class PedidosConRecetaAdmin(admin.ModelAdmin):
#     inlines = [
#         ProductoEnStockInline,
#     ]

# admin.site.register(PedidosConReceta, PedidosConRecetaAdmin)
admin.site.register(PedidosConReceta)