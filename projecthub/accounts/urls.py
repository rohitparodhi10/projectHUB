from django.contrib import admin
from django.urls import path
from accounts.views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterView.as_view()),
    path('update/<int:id>/',UserUpdateView.as_view()),
    # Forgot Passoword api 
    path("userid/", get_user_id, name="get user id"),
    path("forgotpassword/<int:user_id>/", update_password, name="Forgot update password"),
    path('token/', CustomTokenObtainPairView.as_view()),
    path('token/refresh/',TokenRefreshView.as_view()),
]
