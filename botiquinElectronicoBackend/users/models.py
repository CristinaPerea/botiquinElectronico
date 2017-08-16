from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Cliente(User):
    edad = models.IntegerField()
    direccion = models.CharField(max_length=50)