from django.db import models


class Feedback(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    message=models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    