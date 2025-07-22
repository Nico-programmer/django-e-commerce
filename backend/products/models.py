from django.db import models

# Category
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nombre')
    image = models.ImageField(upload_to='category/', blank=True, null=True, verbose_name='Imagen')
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        
    def __str__(self):
        return f'{ self.name }'

class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nombre')
    description = models.CharField(max_length=250, verbose_name='Descripción')
    brand = models.CharField(max_length=150, verbose_name='Marca')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    model_year = models.DateField(verbose_name='Año del modelo')
    price = models.DecimalField(verbose_name='Precio o Valor', decimal_places=2, max_digits=10)
    iva = models.DecimalField(verbose_name='Iva', default=19.0, decimal_places=2, max_digits=10)
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name='Imagen')
    stock = models.IntegerField(verbose_name='Cantidad')
    
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        
    def __str__(self):
        return f'{ self.name }'