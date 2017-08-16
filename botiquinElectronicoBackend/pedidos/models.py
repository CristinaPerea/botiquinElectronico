from django.core.validators import MaxValueValidator
from django.db import models
from users.models import Cliente

# Clase de pedidos sin receta
class PedidosSinReceta():
    id_cliente = models.ForeignKey(Cliente)
    cantidad = models.PositiveIntegerField(min_value=0, validators=[MaxValueValidator(5),])
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    fecha_entrega = models.DateTimeField()
    modificado = models.DateTimeField(auto_now=True)


# Clase de pedidos con receta
class PedidosConReceta():
    id_cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    fecha_entrega = models.DateTimeField()
    pedido_tramitado = models.BooleanField()