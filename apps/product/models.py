from django.db import models
from apps.category.models import Category
from apps.company.models import Company

# Productos
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Categoría')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, verbose_name='Compañía')
    name = models.CharField(max_length=50, verbose_name='Nombre')
    description = models.CharField(max_length=250, verbose_name='Descripción')
    price = models.IntegerField(verbose_name='Precio')
    stock = models.IntegerField(verbose_name='Cantidad')
    
    img = models.ImageField(upload_to='product/', verbose_name='imagen', null=True, blank=True)
    
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        
    def __str__(self):
        return f'{self.name} - {self.company}'
    