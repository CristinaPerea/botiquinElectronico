# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-27 13:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0008_auto_20170827_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pendiente',
            name='fecha_expiracion',
            field=models.DateField(blank=True, null=True),
        ),
    ]
