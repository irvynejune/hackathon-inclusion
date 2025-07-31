from django.shortcuts import render
from rest_framework import generics, permissions
from .models import FinancialEntry
from .serializers import FinancialEntrySerializer

# Create your views here.

class FinancialEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = FinancialEntrySerializer
    permission_classes = [permissions.AllowAny]  # Allow access without authentication

    def get_queryset(self):
        # Return all entries for demo purposes
        return FinancialEntry.objects.all().order_by('-date')

    def perform_create(self, serializer):
        # Create entry without user for demo purposes
        serializer.save()
