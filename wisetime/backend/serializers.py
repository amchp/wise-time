from rest_framework import serializers
from .models import (Actividad, Hijo, HistoriaDeLaActividad)


class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'


class HijoSerializer(serializers.ModelSerializer):
    nombre = serializers.StringRelatedField(source='usuario')
    class Meta:
        model = Hijo
        fields = [
            'usuario',
            'padre',
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
