from rest_framework import serializers
from query.models import *


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model=VideoLink
        fields=['id',"link",'query']   
        
        
class QuerySerializer(serializers.ModelSerializer):
    video_links=LinkSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model=Query
        fields=['id','project_name','query_info', 'email', 'video_links']
        
     
        