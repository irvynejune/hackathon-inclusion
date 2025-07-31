from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Story
from .serializers import StorySerializer

# Create your views here.

class StoryListCreateView(generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [permissions.AllowAny]  # Allow access without authentication

    def get_queryset(self):
        # Return all stories for demo purposes
        return Story.objects.all().order_by('-date_submitted')

    def perform_create(self, serializer):
        # Create story without user for demo purposes
        serializer.save()
