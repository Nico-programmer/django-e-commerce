from django.db import models

# Creamos un modelo para las empresas
class Company(models.Model):
    name = models.CharField(max_length=250, verbose_name='Nombre')
    image = models.ImageField(upload_to='company/image')
    
    class Meta:
        verbose_name = 'Empresa/compañía'
        verbose_name_plural = 'Empresas/compañías'
        
    def __str__(self):
        return f'{self.name}'