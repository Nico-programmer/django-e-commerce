from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate

# Creamos un serializador para el manejo de tokens
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email' # <- Usar solo el email
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        # Autenticar el usuario
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        
        if not user:
            raise serializers.ValidationError('Credenciales inválidas')
        if not user.is_active:
            raise serializers.ValidationError('Usuario inactivo')
        
        # Establece el usuario en self.user
        self.user = user
        
        return super().validate(attrs)
    
    # Obtener un token
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Campos personalizados para el token
        token['email'] = user.email
        token['full_name'] = user.full_name
        
        return token