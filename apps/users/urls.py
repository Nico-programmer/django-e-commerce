from django.urls import path
# Importamos las vistas
from .views import userView, CustomLoginView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('/', userView, name='user_view'),
    path('iniciar-sesión/', CustomLoginView.as_view(), name='login'),
    path('cerrar-sesión/', LogoutView.as_view(), name='logout'),
]
