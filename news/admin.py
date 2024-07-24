# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Article, Category

""" admin.site.unregister(User) """
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_author',)}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Article)
admin.site.register(Category)
