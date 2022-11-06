from django.contrib import admin
from .models import Actividad, Logro, LogroHijo, Notificacion, Sugerencia, Usuario, Tutor, HijoActividad, HistoriaDeLaActividad, Hijo

admin.site.register(Actividad)

admin.site.register(Usuario)

admin.site.register(Tutor)

admin.site.register(HijoActividad)

admin.site.register(HistoriaDeLaActividad)

admin.site.register(Hijo)

admin.site.register(Sugerencia)

admin.site.register(Logro)

admin.site.register(LogroHijo)

admin.site.register(Notificacion)
