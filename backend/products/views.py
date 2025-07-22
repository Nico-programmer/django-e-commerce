from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializer import *
from .models import *

# Vista de categorias
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
    # Enviamos correctamente el contexto (context)
    def get_serializer_context(self):
        return {'request': self.request}
    
    permission_classes = [AllowAny]
    
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    # Enviamos correctamente el contexto (context)
    def get_serializer_context(self):
        return {'request': self.request}
    
    permission_classes = [AllowAny]