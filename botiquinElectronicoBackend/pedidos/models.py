from django.core.validators import MaxValueValidator
from django.db import models
from users.models import Cliente

# Clase de pedidos sin receta
class PedidosSinReceta(models.Model):
    cliente = models.ForeignKey(Cliente)
    fecha_pedido = models.DateField(auto_now_add=True)
    fecha_entrega = models.DateField(blank=True, null=True)
    modificado = models.DateField(auto_now=True)


# Clase de pedidos con receta
class PedidosConReceta(models.Model):
    cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE)
    pedido_tramitado = models.BooleanField()
