# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-20 16:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_producto_precio'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descripcion_html',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
