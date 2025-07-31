from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Inclusion Fields', {
            'fields': (
                'full_name', 'phone', 'location', 'user_type', 'gender', 'disability', 'disability_type',
                'marginalized_groups', 'primary_device', 'literacy_level', 'social_proof',
                'profile_image', 'voice_intro', 'consent_data_collection', 'consent_contact'
            )
        }),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Inclusion Fields', {
            'fields': (
                'full_name', 'phone', 'location', 'user_type', 'gender', 'disability', 'disability_type',
                'marginalized_groups', 'primary_device', 'literacy_level', 'social_proof',
                'profile_image', 'voice_intro', 'consent_data_collection', 'consent_contact'
            )
        }),
    )
    list_display = ('email', 'full_name', 'user_type', 'gender', 'disability', 'is_staff', 'is_active')
    search_fields = ('email', 'full_name', 'phone', 'location')
