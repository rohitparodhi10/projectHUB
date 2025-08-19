from rest_framework import serializers
from project_section.models import *

class ProjectSerializer(serializers.ModelSerializer):
    user_email=serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model=ProjectsUpload
        fields=['project_name','project_description','project_zip','project_link', 'project_stars', 'user_email']
