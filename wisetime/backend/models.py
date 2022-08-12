from django.contrib.postgres.fields import ArrayField
from django.db import models

class Actividad(models.Model):
    class DiasSemana(models.TextChoices):
        lunes = 'Lunes'
        martes = 'Martes'
        miercoles = 'Miercoles'
        jueves = 'Jueves'
        viernes = 'Viernes'
        sabado = 'Sabado'
        domingo = 'Domingo'
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    dias = ArrayField(models.CharField(max_length=255, choices=DiasSemana.choices), max_length=7)
    hora = models.TimeField()


