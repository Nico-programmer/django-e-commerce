from django.urls import path
# Importamos vistas requeridas
from .views import CustomTokenObtainPairView, ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    # Url's para autenticación
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/protected/', ProtectedView.as_view(), name='protected'),
]
