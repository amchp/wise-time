from .models import Actividad
from .serializers import ActividadSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

class ActividadView(viewsets.ModelViewSet):

    serializer_class = ActividadSerializer
    filter_backends = [DjangoFilterBackend]


    def get_queryset(self):
        return Actividad.objects.all() 
