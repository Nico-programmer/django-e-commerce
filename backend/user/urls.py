from django.urls import path, include
# Importamos vistas requeridas
from .views import CustomTokenObtainPairView, ProtectedView, CustomUserView
from rest_framework_simplejwt.views import TokenRefreshView
# Importamos routes
from rest_framework import routers # <- Crear rutas automaticamente

# Creamos rutas por defecto
router = routers.DefaultRouter()
router.register(r'users', CustomUserView, 'user')

urlpatterns = [
    # Url's para autenticación
    path('api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/protected/', ProtectedView.as_view(), name='protected'),
]
