# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-17 19:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0001_initial'),
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pendiente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_pedido', models.DateField()),
                ('fecha_expiracion', models.DateField()),
                ('id_pedido_con_receta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pedidos.PedidosConReceta')),
                ('id_pedido_sin_receta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pedidos.PedidosSinReceta')),
                ('id_producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.Producto')),
            ],
        ),
    ]
