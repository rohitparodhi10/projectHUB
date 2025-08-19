from django.db import models

class Query(models.Model):
    project_name=models.CharField(max_length=100, null=True, blank=True)
    query_info=models.CharField(max_length=1000)
    email=models.EmailField()
    
    def __str__(self):
        return self.email


class VideoLink(models.Model):
    query=models.ForeignKey(Query, null=True, blank=True, related_name='video_links', on_delete=models.CASCADE)
    link=models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.link