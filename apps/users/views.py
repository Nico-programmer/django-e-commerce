from django.shortcuts import render
# Impormos el modelo
from .models import CustomUser
# Login
from django.contrib.auth.views import LoginView

# Visualizar usuario
def userView(request):
    user = request.user # Usuario autenticado
    
    return render(request, 'users.html', {'user': user})

# Creamos una vista basada en clase (más orden)
class CustomLoginView(LoginView):
    # Template
    template_name='login.html'
    # Redirige al Home si esta autenticado
    redirect_authenticated_user = True