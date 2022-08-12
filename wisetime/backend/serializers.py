from rest_framework import serializers
from .models import (Actividad)

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'