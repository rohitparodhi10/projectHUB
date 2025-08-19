from django.urls import path, include
from project_section.views import *

urlpatterns = [
    path("github/search/", search_repositories),
    path("projectsupload/", ProjectsUploadView.as_view()),
]
 