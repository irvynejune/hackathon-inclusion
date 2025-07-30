from rest_framework import serializers
from .models import FinancialEntry

class FinancialEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialEntry
        fields = '__all__'
        read_only_fields = ['user']