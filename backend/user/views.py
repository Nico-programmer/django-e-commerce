from django.shortcuts import render
# Importamos vistas y serializadores
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from .models import CustomUser

# Vista basada en clase para obtener el token
class CustomTokenObtainPairView(TokenObtainPairView):
    # Obtenemos el serializador
    serializer_class = CustomTokenObtainPairSerializer
    
# Vista protegida para que solo el token tenga acceso
class ProtectedView(APIView):
    # Validamos si inicio sesión
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({'message': f'Hola {request.user.fullname}, estas autenticado!', 'email': request.user.email})
    
# Vista para mostrar usuarios
class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    
    queryset = CustomUser.objects.all()
    
    # Agregamos permisos
    permission_classes = [IsAuthenticated]