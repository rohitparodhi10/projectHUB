from django.contrib import admin
from django.urls import path
from feedback.views import *

urlpatterns = [
    path("contact/", FeedbackView.as_view()),
]
