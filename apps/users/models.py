from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from apps.company.models import Company

# Creamos nuestro Manejador de usuarios (creación)
class CustomUserManager(BaseUserManager):
    # Creamos una función para poder controlar la creación de usuarios
    def create_user(self, email, full_name, password=None, **extra_fields):
        # Validamos si el usuario tiene un correo
        if not email:
            raise ValueError('El usuario debe contener un correo electrónico')
        
        # Normalizamos el correo
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        # Encriptamos la contraseña
        user.set_password(password)
        # Guardamos el usuario
        user.save(using=self.db)
        return user # Devolvemos el usuario
    
    # Creamos una función para poder crear un super usuario
    def create_superuser(self, email, full_name, password=None, **extra_fields):
        # Habilitamos el super usuario
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        # Validamos la información
        if extra_fields.get('is_staff') is not True:
            raise ValueError('El super usuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El super usuario debe tener is_superuser=True.')
        
        # Retornamos un usuario con el rol de superuser
        return self.create_user(email, full_name, password, **extra_fields)

# Creamos nuestro modelo de usuario personalizado
class CustomUser(AbstractBaseUser, PermissionsMixin):
    # Llamamos a la empresa
    company = models.ForeignKey(Company, on_delete=models.CASCADE, verbose_name='Empresa/Compañía', null=True, blank=True)
    email = models.EmailField(unique=True, verbose_name='Correo electronico')
    full_name = models.CharField(max_length=250, verbose_name='Nombre completo')
    
    # Validación de estados
    is_active = models.BooleanField(default=True, verbose_name='¿Usuario activo?')
    is_staff = models.BooleanField(default=False, verbose_name='¿Es parte del cuerpo tecnico?')
    
    # Usamos el modelo personalizado
    objects = CustomUserManager()
    
    # Valores obligatorios
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']
    
    class Meta:
        verbose_name = 'Usuario personalizado'
        verbose_name_plural = 'Usuarios personalizados'
        
    def __str__(self):
        return self.email