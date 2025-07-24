from django.shortcuts import render
from .models import *

# Vista para ver todos los usuarios
def ProductView(request):
    products = Product.objects.all()
    
    return render(request, 'Products.html', {'products': products})