# Updated ReactAppView - Add this to your existing view
import os
import re
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from django.views import View
from django.templatetags.static import static

class ReactAppView(View):
    def get(self, request):
        template_path = os.path.join(settings.BASE_DIR, 'templates', 'index.html')
        if os.path.exists(template_path):
            with open(template_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
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
            
            # 🔥 ADD THIS: Handle pictures/images
            html_content = re.sub(
                r'src="/pictures/([^"]+)"',
                lambda m: f'src="{static(f"pictures/{m.group(1)}")}"',
                html_content
            )
            
            # Handle vite.svg
            html_content = html_content.replace(
                'href="/vite.svg"',
                f'href="{static("vite.svg")}"'
            )
            
            # Remove development script
            html_content = re.sub(
                r'<script[^>]*src="/src/main\.jsx"[^>]*></script>',
                '',
                html_content
            )
            
            return HttpResponse(html_content, content_type='text/html')
        else:
            return render(request, 'fallback_index.html')