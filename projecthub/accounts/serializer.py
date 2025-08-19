from rest_framework import serializers
from accounts.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    tokens=serializers.SerializerMethodField()
    
    class Meta:
        model=User
        fields=['id','email','password','user_image', 'login_count', 'tokens']
        extra_kwargs={'password':{'write_only': True}}
    
    def get_tokens(self, obj):
        refresh=RefreshToken.for_user(obj)
        
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token),
        }

    def create(self, validated_data):
        password=validated_data.pop('password')
        user=User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class CustomObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self,attrs):
        
        email=attrs.get('email')
        password=attrs.get('password')
        
        if email is None or password is None:
            raise serializers.ValidationError("Both Username and Password are required!")
        
        try:
            user=User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No account found with this credentials")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid Password")
        
        if not user.is_active:
            raise serializers.ValidationError({"detail":"This account is disabled"})
        
        data=super().validate(attrs)
        
        user.login_count+=1
        user.save()
        
        data["login_count"]=user.login_count
            
        
        return data   
    
        
    

