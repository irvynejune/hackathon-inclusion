from django.db import models
from userauth.models import User

# Create your models here.

class Story(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stories')
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)  # Text story
    audio_file = models.URLField(blank=True)  # URL to audio file
    tags = models.JSONField(default=list, blank=True)  # e.g., ['urgency', 'gender violence', 'refugee', 'creative']
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    date_submitted = models.DateTimeField(auto_now_add=True)
    date_approved = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_stories')

    def __str__(self):
        return f'{self.user.email} - {self.title} - {self.status}'
