from django.db import models
from accounts.models import *

class ProjectsUpload(models.Model):
    project_name=models.CharField(max_length=100)
    project_description=models.CharField(max_length=599)
    project_zip=models.FileField(upload_to="project_data", blank=True, null=True)
    project_link=models.CharField(max_length=1000, default=None)
    project_stars=models.IntegerField(default=1)
    
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects_upload")
    
    def __str__(self):
        return self.project_name