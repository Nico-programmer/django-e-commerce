from django.shortcuts import render
# Apps
from apps.product.models import *

# Vista para visualizar todo
def homeView(request):
    
    products = Product.objects.all()
    
    return render(request, 'pages/home.html', {'products': products})