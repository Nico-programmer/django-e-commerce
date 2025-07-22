from django.shortcuts import render
# Impormos el modelo
from .models import CustomUser

# Visualizar usuario
def userView(request):
    user = request.user # Usuario autenticado
    
    return render(request, 'users.html', {'user': user})