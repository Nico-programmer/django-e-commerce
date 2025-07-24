from django.db import models

# Categoría
class Category(models.Model):
    name = models.CharField(max_length=25, verbose_name='Nombre')
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorias'