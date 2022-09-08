from rest_framework import serializers
from .models import (Actividad, Hijo, HijoActividad, HistoriaDeLaActividad)


class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = [
            'nombre',
            'descripcion',
            'dias',
            'hijos',
        ]


class HijoSerializer(serializers.ModelSerializer):
    nombre = serializers.StringRelatedField(source='usuario')
    class Meta:
        model = Hijo
        fields = [
            'usuario',
            'tutor',
            'nombre',
        ]


class HistoriaDeLaActividadSerializer(serializers.ModelSerializer):
    actividad = serializers.SerializerMethodField('conseguir_actividad')

    class Meta:
        model = HistoriaDeLaActividad
        fields = [
            'hijo_actividad',
            'completado',
            'confirmado',
            'dia',
            'actividad',
        ]
    
    def conseguir_actividad(self, historia_de_la_actividad):
        return ActividadSerializer(historia_de_la_actividad.hijo_actividad.actividad).data
class HijoActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = HijoActividad
        fields = '__all__'
