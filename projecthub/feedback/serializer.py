from rest_framework import serializers
from feedback.models import *

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields=["name", "email", 'message']
        