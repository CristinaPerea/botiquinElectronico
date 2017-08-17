from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Cliente(User):
    edad = models.IntegerField(validators=[MaxValueValidator(110), MinValueValidator(0)])
    direccion = models.CharField(max_length=50)