from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from datetime import date
from math import floor, log2, ceil



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

    def save(self):
        super(HistoriaDeLaActividad, self).save(0)
        hijo = self.hijo_actividad.hijo
        actividad = self.hijo_actividad.actividad
        if self.confirmado:
            Notificacion.objects.create(
                descripcion=f'Se ha confirmado que hiciste {actividad.nombre}.',
                usuario=hijo.usuario
            )
            numeroDeActividadesConfirmadas = HistoriaDeLaActividad.objects.filter(
                    hijo_actividad__hijo=hijo,
                    confirmado=True
            ).count()
            if floor(log2(numeroDeActividadesConfirmadas)) != floor(log2(numeroDeActividadesConfirmadas + 1)):
                logro, created = Logro.objects.get_or_create(
                    descripcion=f'Has completado {numeroDeActividadesConfirmadas} actividad',
                )
                LogroHijo(
                    hijo=hijo,
                    logro=logro
                ).save()
                self.hijo_actividad.hijo.puntos += ceil(
                    max(numeroDeActividadesConfirmadas - 3, 0) *50 / numeroDeActividadesConfirmadas
                )
        if self.completado and not self.confirmado:
            Notificacion.objects.create(
                descripcion=f'{hijo.usuario} ha completado {actividad.nombre}.',
                usuario=hijo.tutor.usuario
            )

    def delete(self, *args, **kwargs):
        hijo = self.hijo_actividad.hijo
        actividad = self.hijo_actividad.actividad
        Notificacion.objects.create(
            descripcion=f'No se ha confirmado que hiciste {actividad.nombre}.',
            usuario=hijo.usuario
        )
        super().delete()



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
    creado = models.DateTimeField(auto_now_add=True)


class Hijo(models.Model):
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, primary_key=True)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    puntos = models.IntegerField(default=0)
    actividades = models.ManyToManyField(Actividad, through=HijoActividad)
    edad = models.IntegerField(default=0)


class Sugerencia(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    edad = models.IntegerField()

class LogroHijo(models.Model):
    logro = models.ForeignKey("Logro", on_delete=models.CASCADE)
    hijo = models.ForeignKey("Hijo", on_delete=models.CASCADE)

    def save(self):
        super(LogroHijo, self).save()
        hijo = self.hijo
        logro = self.logro
        Notificacion.objects.create(
            descripcion=f'Ganaste el logro {logro.descripcion}',
            usuario=hijo.usuario
        )
        Notificacion.objects.create(
            descripcion=f'{hijo.usuario} gano el logro {logro.descripcion}',
            usuario=hijo.tutor.usuario
        )


class Logro(models.Model):
    descripcion = models.CharField(max_length=255)
    hijos = models.ManyToManyField(Hijo, through=LogroHijo)


class Notificacion(models.Model):
    descripcion = models.CharField(max_length=255)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tiempo = models.DateTimeField(auto_now_add=True)
