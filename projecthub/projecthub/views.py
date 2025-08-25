import os
import re
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from django.views import View
from django.templatetags.static import static

class ReactAppView(View):
    def get(self, request):
        # Path to the built index.html
        template_path = os.path.join(settings.BASE_DIR, 'templates', 'index.html')
        
        if os.path.exists(template_path):
            with open(template_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Replace asset paths with Django static URLs
            # Handle CSS files
            html_content = re.sub(
                r'href="/assets/([^"]+\.css)"',
                lambda m: f'href="{static(f"assets/{m.group(1)}")}"',
                html_content
            )
            
            # Handle JS files  
            html_content = re.sub(
                r'src="/assets/([^"]+\.js)"',
                lambda m: f'src="{static(f"assets/{m.group(1)}")}"',
                html_content
            )
            
            # Handle vite.svg
            html_content = html_content.replace(
                'href="/vite.svg"',
                f'href="{static("vite.svg")}"'
            )
            
            # Remove the development script tag and replace with nothing
            # The production assets should already be linked in the built HTML
            html_content = re.sub(
                r'<script[^>]*src="/src/main\.jsx"[^>]*></script>',
                '',
                html_content
            )
            
            return HttpResponse(html_content, content_type='text/html')
        else:
            # Fallback to a simple template
            return render(request, 'fallback_index.html')

# Alternative approach: Create a management command to process the HTML after build
from django.core.management.base import BaseCommand

class ProcessViteHtmlCommand(BaseCommand):
    help = 'Process Vite-built HTML to work with Django static files'
    
    def handle(self, *args, **options):
        template_path = os.path.join(settings.BASE_DIR, 'templates', 'index.html')
        
        if os.path.exists(template_path):
            with open(template_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Process the content
            content = re.sub(r'href="/assets/', r'href="{% static "assets/', content)
            content = re.sub(r'src="/assets/', r'src="{% static "assets/', content)
            content = re.sub(r'\.css"', r'.css" %}', content)
            content = re.sub(r'\.js"', r'.js" %}', content)
            content = content.replace('href="/vite.svg"', 'href="{% static "vite.svg" %}"')
            
            # Add template tag at the top
            if not content.startswith('{% load static %}'):
                content = '{% load static %}\n' + content
            
            # Remove development script
            content = re.sub(r'<script[^>]*src="/src/main\.jsx"[^>]*></script>', '', content)
            
            with open(template_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully processed {template_path}')
            )