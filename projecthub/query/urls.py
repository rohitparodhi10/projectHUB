from django.contrib import admin
from django.urls import path
from query.views import *

urlpatterns = [
    path("raise/", QueryView.as_view()),
    path("link/", LinkView.as_view()),
]
