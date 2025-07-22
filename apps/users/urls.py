from django.urls import path
# Importamos las vistas
from .views import userView

urlpatterns = [
    path('/', userView, name='user_view'),
]
