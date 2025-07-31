from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    user_type = models.CharField(max_length=20, choices=[
        ('creative', 'Creative'),
        ('field_agent', 'Field Agent'),
        ('admin', 'Admin'),
        ('heva_team', 'HEVA Team')
    ], default='creative')
    gender = models.CharField(max_length=20, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('non-binary', 'Non-binary'),
        ('other', 'Other'),
        ('prefer_not_to_say', 'Prefer not to say')
    ], default='prefer_not_to_say')
    disability = models.BooleanField(default=False)
    disability_type = models.CharField(max_length=100, blank=True)
    marginalized_groups = models.JSONField(default=list, blank=True)  # e.g. ['refugee', 'PWD', 'LGBTQI+', 'creative']
    primary_identity = models.CharField(max_length=50, choices=[
        ('creative', 'Creative Professional'),
        ('pwd', 'Person with Disability'),
        ('refugee', 'Refugee'),
        ('lgbtq', 'LGBTQ+'),
        ('youth', 'Youth'),
        ('elderly', 'Elderly'),
        ('rural', 'Rural Community'),
        ('urban_poor', 'Urban Poor'),
        ('other', 'Other')
    ], default='creative')
    accessibility_needs = models.JSONField(default=list, blank=True)  # e.g. ['screen_reader', 'voice_navigation', 'high_contrast']
    language_preference = models.CharField(max_length=20, default='english')
    support_priority = models.CharField(max_length=20, choices=[
        ('financial', 'Financial Support'),
        ('skills', 'Skills Training'),
        ('accessibility', 'Accessibility Tools'),
        ('community', 'Community Support'),
        ('legal', 'Legal Support'),
        ('health', 'Health Support')
    ], default='financial')
    primary_device = models.CharField(max_length=50, blank=True)
    literacy_level = models.CharField(max_length=50, blank=True)
    social_proof = models.JSONField(default=dict, blank=True)  # e.g. {'reference_name': '', 'relationship': '', 'phone': ''}
    profile_image = models.URLField(blank=True)
    voice_intro = models.URLField(blank=True)
    consent_data_collection = models.BooleanField(default=False)
    consent_contact = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    # Creative User fields
    creative_skills = models.CharField(max_length=100, blank=True)
    portfolio_url = models.URLField(blank=True)
    experience_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('professional', 'Professional')
    ], default='beginner')
    preferred_medium = models.CharField(max_length=20, choices=[
        ('digital', 'Digital'),
        ('traditional', 'Traditional'),
        ('mixed', 'Mixed Media'),
        ('performance', 'Performance')
    ], default='digital')
    
    # Field Agent fields
    region = models.CharField(max_length=100, blank=True)
    organization = models.CharField(max_length=100, blank=True)
    experience_years = models.CharField(max_length=10, choices=[
        ('0-1', '0-1 years'),
        ('2-5', '2-5 years'),
        ('6-10', '6-10 years'),
        ('10+', '10+ years')
    ], default='0-1')
    languages = models.CharField(max_length=100, blank=True)
    specializations = models.CharField(max_length=100, blank=True)
    supervisor_name = models.CharField(max_length=100, blank=True)
    supervisor_contact = models.CharField(max_length=20, blank=True)
    
    # Admin fields
    department = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=50, choices=[
        ('system_admin', 'System Administrator'),
        ('data_admin', 'Data Administrator'),
        ('user_admin', 'User Administrator'),
        ('content_admin', 'Content Administrator'),
        ('supervisor', 'Supervisor')
    ], blank=True)
    access_level = models.CharField(max_length=20, choices=[
        ('standard', 'Standard'),
        ('elevated', 'Elevated'),
        ('admin', 'Administrator'),
        ('super_admin', 'Super Administrator')
    ], default='standard')
    emergency_contact = models.CharField(max_length=20, blank=True)
    security_clearance = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.email
