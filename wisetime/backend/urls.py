from .views import (ActividadView, HijoActividadView, HijoView, HistoriaDeLaActividadView)
from rest_framework import routers

router = routers.DefaultRouter()
router.register('actividad', ActividadView, 'actividad')
router.register('hijo', HijoView, 'hijo')
router.register('historia_de_la_actividad', HistoriaDeLaActividadView, 'historia_de_la_actividad')
router.register('hijo_actividad', HijoActividadView, 'hijo_actividad')

urlpatterns = router.urls