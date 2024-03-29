# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-17 18:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_auto_20170817_2006'),
    ]

    operations = [
        migrations.CreateModel(
            name='PedidosConReceta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pedido_tramitado', models.BooleanField()),
                ('id_cliente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.Cliente')),
            ],
        ),
        migrations.CreateModel(
            name='PedidosSinReceta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_pedido', models.DateField(auto_now_add=True)),
                ('fecha_entrega', models.DateField()),
                ('modificado', models.DateField(auto_now=True)),
                ('id_cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.Cliente')),
            ],
        ),
    ]
