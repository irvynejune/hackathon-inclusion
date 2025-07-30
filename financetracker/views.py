from django.shortcuts import render
from rest_framework import generics, permissions
from .models import FinancialEntry
from .serializers import FinancialEntrySerializer

# Create your views here.

class FinancialEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = FinancialEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FinancialEntry.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
