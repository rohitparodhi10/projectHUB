from django.shortcuts import render, get_object_or_404
from accounts.models import *
from accounts.serializer import *
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

class UserRegisterView(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    

class UserUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    lookup_field='id'

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomObtainPairSerializer    
    
# Forgot Password API
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_id(request):
    email = request.GET.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = get_object_or_404(User, email=email)
        return Response({'id': user.id})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([AllowAny])
def update_password(request, user_id):
    try:
        data = request.data
        password = data.get('password')
        if not password:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(User, id=user_id)
        user.set_password(password)
        user.save()
        return Response({'message': 'Password updated successfully'})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
