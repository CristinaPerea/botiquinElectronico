from django.contrib import admin
from pedidos.models import PedidosSinReceta, PedidosConReceta

class PedidosSinRecetaAdmin(admin.ModelAdmin):
    icon = '<i class="material-icons">attach_money</i>'

admin.site.register(PedidosSinReceta, PedidosSinRecetaAdmin)

class PedidosConRecetaAdmin(admin.ModelAdmin):
    model = PedidosConReceta
    exclude = []
    search_fields = ('cliente__last_name', 'cliente__first_name')
    icon = '<i class="material-icons">money_off</i>'

admin.site.register(PedidosConReceta, PedidosConRecetaAdmin)