from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

# Manejamos el usuario.
class CustomUserManager(BaseUserManager):
    # Crear usuario personalizado
    def create_user(self, email, password=None, **extra_fields):
        # Validar el correo
        if not email:
            # Mensaje de error
            raise ValueError("El correo es obligatorio")
        
        # Normalizamos el correo
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        # Encriptamos la contraseña
        user.set_password(password)
        # Guardamos al usuario
        user.save(using=self._db)
        return user
    
    # Crear usaurio administrador
    def create_superuser(self, email, password=None, **extra_fields):
        # Aplicamos valores por defecto
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        return self.create_user(email, password, **extra_fields)

# Creamos un usuario personalizado
class CustomUser(AbstractBaseUser, PermissionsMixin):
    # Campos personalizados
    email = models.EmailField(unique=True, verbose_name='Correo electronico')
    full_name = models.CharField(max_length=255, blank=True, verbose_name='Nombre completo')
    
    # Nombre de la empresa
    Company = models.CharField(max_length=150, null=True, blank=True, verbose_name='Compañia')
    
    # Valores por defecto
    is_active = models.BooleanField(default=True, verbose_name='Usuario activo?')
    is_superuser = models.BooleanField(default=False, verbose_name='Super usuario?')
    is_staff = models.BooleanField(default=False, verbose_name='Es staff?')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    def __str__(self):
        return f'{self.full_name} ({self.email})'
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'