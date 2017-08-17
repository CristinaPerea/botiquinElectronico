from django.db import models

from pedidos.models import PedidosConReceta, PedidosSinReceta


class Producto(models.Model):
    nombre_producto = models.CharField(max_length=150)
    foto_producto = models.URLField()
    con_receta = models.BooleanField()
    duracion = models.IntegerField()
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_producto

class ProductoEnStock(models.Model):
    id_producto = models.ForeignKey(Producto)
    id_pedido_con_receta = models.ForeignKey(PedidosConReceta, blank=True, null=True)
    id_pedido_sin_receta = models.ForeignKey(PedidosSinReceta, blank=True, null=True)
    fecha_pedido = models.DateField()
    fecha_expiracion = models.DateField()

class Pendiente(models.Model):
    id_producto = models.ForeignKey(Producto)
    id_pedido_con_receta = models.ForeignKey(PedidosConReceta, blank=True, null=True)
    id_pedido_sin_receta = models.ForeignKey(PedidosSinReceta, blank=True, null=True)
    fecha_pedido = models.DateField()
    fecha_expiracion = models.DateField()