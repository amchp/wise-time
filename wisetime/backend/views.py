from urllib import response
from .models import Actividad, Hijo, HijoActividad, HistoriaDeLaActividad, Logro, Notificacion, Sugerencia, Tutor
from .serializers import ActividadSerializer, HijoActividadSerializer, HijoSerializer, HistoriaDeLaActividadSerializer, LogroSerializer, MonitoreoDeActividadSerializer, NotificacionSerializer, SugerenciaSerializer, TutorSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.filters import BaseFilterBackend
from django_filters.rest_framework import (
    DjangoFilterBackend,
    FilterSet,
    CharFilter
)


class DiasFilter(FilterSet):
    dias = CharFilter(field_name='dias', lookup_expr='icontains')

    class Meta:
        model = Actividad
        fields = ['dias']


class DiasFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        dias = DiasFilter(request.query_params)
        return (queryset & dias.qs)



class ActividadView(viewsets.ModelViewSet):

    serializer_class = ActividadSerializer
    filter_backends = [DjangoFilterBackend, DiasFilterBackend]
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


class MonitoreoDeActividadView(viewsets.ReadOnlyModelViewSet):

    serializer_class = MonitoreoDeActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'hijo_actividad__hijo': ['exact'],
        'dia': ['gte', 'lte', 'exact'],
        'confirmado': ['exact']
    }

    def list(self, request):
        query_set_filtrado = self.filter_queryset(self.get_queryset())

        query_set_resumido = query_set_filtrado.values(
            'dia'
        ).annotate(
            cuenta=Count('dia')
        )

        serializer = self.get_serializer(query_set_resumido, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return HistoriaDeLaActividad.objects


class HijoActividadView(viewsets.ModelViewSet):

    serializer_class = HijoActividadSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'actividad',
        'hijo',
        'hijo__tutor'
    ]

    def get_queryset(self):
        return HijoActividad.objects.all()


class TutorView(viewsets.ModelViewSet):

    serializer_class = TutorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'email', 'usuario'
    ]

    def get_queryset(self):
        return Tutor.objects.all()


class SugerenciaView(viewsets.ModelViewSet):

    serializer_class = SugerenciaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'edad',
    ]

    def get_queryset(self):
        return Sugerencia.objects.all()


class LogroView(viewsets.ModelViewSet):

    serializer_class = LogroSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'hijo',
    ]

    def get_queryset(self):
        return Logro.objects.all()


class NotificacionView(viewsets.ModelViewSet):

    serializer_class = NotificacionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        'hijo',
    ]

    def get_queryset(self):
        return Notificacion.objects.all()
