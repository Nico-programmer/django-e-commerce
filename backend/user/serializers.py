from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Creamos un serializador para el manejo de tokens
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    # Obtener un token
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Campos personalizados para el token
        token['email'] = user.email
        token['full_name'] = user.full_name
        
        return token