from django.contrib import admin
from django.urls import path,include, re_path
from accounts.urls import *
from project_section.urls import *
from feedback.urls import *
from query.urls import *
from django.conf import settings
from django.conf.urls.static import static
from .views import ReactAppView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include('accounts.urls')),
    path('projectsection/', include("project_section.urls")),
    path('feedback/', include("feedback.urls")),
    path('query/', include("query.urls")),
    path('', ReactAppView.as_view(), name='react_app'),
    path('<path:path>', ReactAppView.as_view(), name='react_app_catchall'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)