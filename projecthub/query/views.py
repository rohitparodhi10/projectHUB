from django.shortcuts import render
from query.serializer import *
from query.models import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class QueryView(generics.ListCreateAPIView):
    queryset=Query.objects.all()
    serializer_class=QuerySerializer
    permission_classes=[IsAuthenticated]
    

class LinkView(generics.ListCreateAPIView):
    queryset=VideoLink.objects.all()
    serializer_class=LinkSerializer
    permission_classes=[IsAuthenticated]
    
