from rest_framework import serializers
from .models import (Actividad, Hijo, HijoActividad, HistoriaDeLaActividad)


class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = [
            'id',
            'nombre',
            'descripcion',
            'dias',
            'hora',
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
            'puntos',
        ]


class HistoriaDeLaActividadSerializer(serializers.ModelSerializer):
    actividad = serializers.SerializerMethodField('conseguir_actividad')

    class Meta:
        model = HistoriaDeLaActividad
        fields = [
            'id',
            'hijo_actividad',
            'completado',
            'confirmado',
            'dia',
            'actividad',
        ]

    def conseguir_actividad(self, historia_de_la_actividad):
        return historia_de_la_actividad.hijo_actividad.actividad.pk

    def update(self, instance, validated_data):
        if validated_data['confirmado']:
            instance.hijo_actividad.hijo.puntos += 5
            instance.hijo_actividad.hijo.save()
        return super().update(instance, validated_data)


class HijoActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = HijoActividad
        fields = '__all__'
