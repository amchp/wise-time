from email.policy import default
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from datetime import date


class Usuario(AbstractUser):
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    es_hijo = models.BooleanField(default=False)
    es_tutor = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['nombre', 'apellido', 'es_hijo', 'es_tutor']

    class Meta:
        constraints = [
            models.CheckConstraint(
                name='check_one_user',
                check=(
                    models.Q(es_hijo=True, es_tutor=False) |
                    models.Q(es_hijo=False, es_tutor=True)
                ),
            ),
        ]

    def __str__(self):
        return self.nombre + ' ' + self.apellido

    


class Tutor(models.Model):
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField()


class HijoActividad(models.Model):
    actividad = models.ForeignKey("Actividad", on_delete=models.CASCADE)
    hijo = models.ForeignKey("Hijo", on_delete=models.CASCADE)


class HistoriaDeLaActividad(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['hijo_actividad', 'dia'], name='name of constraint')
        ]
    hijo_actividad = models.ForeignKey(HijoActividad, on_delete=models.CASCADE)
    completado = models.BooleanField(default=False)
    confirmado = models.BooleanField(default=False)
    dia = models.DateField(default=date.today)


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
    dias = ArrayField(models.CharField(
        max_length=255, choices=DiasSemana.choices), max_length=7)
    hora = models.TimeField()
    hijos = models.ManyToManyField("Hijo", through=HijoActividad)


class Hijo(models.Model):
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, primary_key=True)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    puntos = models.IntegerField(default=0)
    actividades = models.ManyToManyField(Actividad, through=HijoActividad)
    # edad = models.IntegerField(default=0)
