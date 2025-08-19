from django.http import JsonResponse
from django.conf import settings
from project_section.utils import search_github_repositories
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from project_section.models import *
from project_section.serializer import *

def search_repositories(request):
    # Get the query parameter or use "django" as the default query
    query = request.GET.get("query", "django")
    
    # Call the function to search GitHub repositories
    repos = search_github_repositories(query)

    # Check if an error occurred (check for 'error' key in response dictionary)
    if "error" in repos:
        # Return the error message with a 400 status code
        return JsonResponse(repos, status=400)

    # Return the successful repositories data as JSON
    return JsonResponse(repos)


class ProjectsUploadView(generics.ListCreateAPIView):
    queryset=ProjectsUpload.objects.select_related('user').all()
    serializer_class=ProjectSerializer
    permission_classes=[AllowAny]
    
    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the uploaded project
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            raise ValueError("User must be authenticated to upload a project")