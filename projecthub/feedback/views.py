from django.shortcuts import render
from feedback.models import *
from feedback.serializer import *
from rest_framework import generics
from rest_framework.permissions import AllowAny

class FeedbackView(generics.ListCreateAPIView):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializer
    permission_classes=[AllowAny]
    
    