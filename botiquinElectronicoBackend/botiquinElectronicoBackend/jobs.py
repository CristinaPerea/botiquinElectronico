from django_cron import CronJobBase, Schedule

from productos.models import Pendiente, ProductoEnStock


class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 1 # cada minuto
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'botiquinElectronicoBackend.jobs'
    def do(self):
        productos_pendientes = Pendiente.objects.all()
        for producto in productos_pendientes:
            producto_para_stock = ProductoEnStock(id_producto = producto.id_producto,
                                                  id_pedido_con_receta = producto.id_pedido_con_receta,
                                                  id_pedido_sin_receta = producto.id_pedido_sin_receta,
                                                  fecha_pedido = producto.fecha_pedido,
                                                  fecha_expiracion = producto.fecha_expiracion)
            producto_para_stock.save()
            producto.delete()