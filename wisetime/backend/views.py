from .models import Actividad, Hijo, HistoriaDeLaActividad
from .serializers import ActividadSerializer, HijoSerializer, HistoriaDeLaActividadSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


class ActividadView(viewsets.ModelViewSet):

    serializer_class = ActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'nombre',
        'descripcion',
    ]

    def get_queryset(self):
        return Actividad.objects.all()


class HijoView(viewsets.ModelViewSet):

    serializer_class = HijoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'padre',
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
