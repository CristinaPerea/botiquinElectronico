from django.db import models

from pedidos.models import PedidosConReceta, PedidosSinReceta


class Producto(models.Model):
    nombre_producto = models.CharField(max_length=150)
    foto_producto = models.URLField()
    con_receta = models.BooleanField()
    duracion = models.IntegerField()
    descripcion = models.TextField()
    descripcion_html = models.TextField()
    precio = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre_producto

class ProductoEnStock(models.Model):
    id_producto = models.ForeignKey(Producto)
    id_pedido_con_receta = models.ForeignKey(PedidosConReceta, blank=True, null=True, related_name='productos_en_stock')
    id_pedido_sin_receta = models.ForeignKey(PedidosSinReceta, blank=True, null=True, related_name='productos_en_stock')
    fecha_pedido = models.DateField()
    fecha_expiracion = models.DateField(blank=True, null=True)

    def save(self):
        from datetime import datetime, timedelta
        d = timedelta(days=self.id_producto.duracion)
        self.fecha_expiracion = self.fecha_pedido + d
        super(ProductoEnStock, self).save()

    def __str__(self):
        return str(self.id_producto)

class Pendiente(models.Model):
    id_producto = models.ForeignKey(Producto)
    id_pedido_con_receta = models.ForeignKey(PedidosConReceta, blank=True, null=True)
    id_pedido_sin_receta = models.ForeignKey(PedidosSinReceta, blank=True, null=True)
    fecha_pedido = models.DateField()
    fecha_expiracion = models.DateField(blank=True, null=True)

    def save(self, force_insert=False, using=None):
        from datetime import datetime, timedelta
        d = timedelta(days=self.id_producto.duracion)
        self.fecha_expiracion = self.fecha_pedido + d
        super(Pendiente, self).save()

    def __str__(self):
        return str(self.id_producto)
    