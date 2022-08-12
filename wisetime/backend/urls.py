from .views import (ActividadView)
from rest_framework import routers

router = routers.DefaultRouter()
router.register('actividad', ActividadView, 'clase')



urlpatterns = [
]

urlpatterns = router.urls