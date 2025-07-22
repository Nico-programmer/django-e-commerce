from django.urls import path, include
from rest_framework import routers
from .views import *

# Creamos las rutas
routerCategory = routers.DefaultRouter()
routerCategory.register(r'categorys', CategoryView, 'category')

routerProduct = routers.DefaultRouter()
routerProduct.register(r'products', ProductView, 'product')

# Iniciamos las turas
urlpatterns = [
    path('api/category/', include(routerCategory.urls)),
    path('api/product/', include(routerProduct.urls)),
]
