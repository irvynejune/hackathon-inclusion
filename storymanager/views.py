from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Story
from .serializers import StorySerializer

# Create your views here.

class StoryListCreateView(generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Story.objects.filter(user=self.request.user).order_by('-date_submitted')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
