from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)
    user_type = models.CharField(max_length=20, choices=[
        ('creative', 'Creative'),
        ('agent', 'Agent'),
        ('admin', 'Admin')
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
    primary_device = models.CharField(max_length=50, blank=True)
    literacy_level = models.CharField(max_length=50, blank=True)
    social_proof = models.JSONField(default=dict, blank=True)  # e.g. {'reference_name': '', 'relationship': '', 'phone': ''}
    profile_image = models.URLField(blank=True)
    voice_intro = models.URLField(blank=True)
    consent_data_collection = models.BooleanField(default=False)
    consent_contact = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.email
