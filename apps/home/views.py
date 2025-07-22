from django.shortcuts import render

# Vista para visualizar todo
def homeView(request):
    return render(request, 'pages/home.html')