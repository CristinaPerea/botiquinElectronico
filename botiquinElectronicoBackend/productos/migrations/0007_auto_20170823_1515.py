# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-23 13:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_auto_20170823_0040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productoenstock',
            name='fecha_expiracion',
            field=models.DateField(blank=True, null=True),
        ),
    ]
