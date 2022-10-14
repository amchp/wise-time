from .views import (ActividadView, HijoActividadView, HijoView, HistoriaDeLaActividadView, MonitoreoDeActividadView, SugerenciaView, TutorView)
from rest_framework import routers

router = routers.DefaultRouter()
router.register('actividad', ActividadView, 'actividad')
router.register('hijo', HijoView, 'hijo')
router.register('historia_de_la_actividad', HistoriaDeLaActividadView, 'historia_de_la_actividad')
router.register('hijo_actividad', HijoActividadView, 'hijo_actividad')
router.register('monitoreo_de_actividad', MonitoreoDeActividadView, 'monitoreo_de_actividad')
router.register('tutor', TutorView, 'tutor')
router.register('sugerencias', SugerenciaView, 'sugerencias')
urlpatterns = router.urls