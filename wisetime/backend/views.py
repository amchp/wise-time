from .models import Actividad, Hijo, HijoActividad, HistoriaDeLaActividad
from .serializers import ActividadSerializer, HijoActividadSerializer, HijoSerializer, HistoriaDeLaActividadSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


class ActividadView(viewsets.ModelViewSet):

    serializer_class = ActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'nombre',
        'descripcion',
        'hijos',
    ]

    def get_queryset(self):
        return Actividad.objects.all()


class HijoView(viewsets.ModelViewSet):

    serializer_class = HijoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'tutor',
        'actividades',
    ]

    def get_queryset(self):
        return Hijo.objects.all()


class HistoriaDeLaActividadView(viewsets.ModelViewSet):

    serializer_class = HistoriaDeLaActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'hijo_actividad__hijo',
        'dia',
    ]

    def get_queryset(self):
        return HistoriaDeLaActividad.objects.all()
class HijoActividadView(viewsets.ModelViewSet):

    serializer_class = HijoActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'actividad',
        'hijo',
    ]

    def get_queryset(self):
        return HijoActividad.objects.all()