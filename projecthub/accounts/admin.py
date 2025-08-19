from django.contrib import admin
from accounts.models import *


class UserAdmin(admin.ModelAdmin):
    list_display=("id",'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'login_count')
    search_fields=('email', 'first_name', 'last_name')
    list_filter=('is_staff', 'is_active')

admin.site.register(User, UserAdmin)