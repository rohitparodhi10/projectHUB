from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
import os

def index(request):
    """Original index view if you need it"""
    return render(request, 'index.html')

def serve_react_app(request):
    """Serve Vite's built React app"""
    try:
        # Read Vite's built index.html
        index_path = os.path.join(settings.BASE_DIR, 'project_front/dist/index.html')
        with open(index_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Replace asset paths to work with Django static files
        html_content = html_content.replace('/assets/', '/static/assets/')
        
        return HttpResponse(html_content, content_type='text/html')
    except FileNotFoundError:
        return HttpResponse(
            "<h1>React App Not Built</h1><p>Run 'npm run build' in the project_front directory.</p>",
            content_type='text/html',
            status=404
        )