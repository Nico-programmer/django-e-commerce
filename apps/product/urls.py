from django.urls import path
from .views import *

urlpatterns = [
    path('', ProductView, name='Ver_productos'),
]
