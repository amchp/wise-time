from pyexpat import model
from rest_framework import serializers
from .models import (Actividad, Hijo, HijoActividad, HistoriaDeLaActividad,Tutor)


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

    def create(self, validated_data):
        actividad = super().create(validated_data)
        hijos = self.context['request'].data.pop('hijos', [])
        for hijo_id in hijos:
            hijo = Hijo.objects.get(pk=hijo_id)
            hijoActivdad = HijoActividad(actividad=actividad, hijo=hijo)
            hijoActivdad.save()
        return actividad

    def update(self, instance, validated_data):
        actividad = super().update(instance,validated_data)
        hijos = self.context['request'].data.pop('hijos', [])
        visto = set()
        hijos_actividad_actuales = HijoActividad.objects.filter(actividad=actividad)
        for hijo_id in hijos:
            hijo = Hijo.objects.get(pk=hijo_id)
            hijoActivdad = HijoActividad(actividad=actividad, hijo=hijo)
            visto.add(hijo_id)
            hijoActivdad.save()
        for hijo_actividad in hijos_actividad_actuales:
            if hijo_actividad.hijo.pk not in visto:
                hijo_actividad.delete()
        return actividad



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
class TutorSerializer(serializers.ModelSerializer):
    nombre = serializers.StringRelatedField(source='usuario')
    class Meta:
        model = Tutor
        fields = ['usuario','nombre','email']