# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-20 16:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_pendiente'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='precio',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]