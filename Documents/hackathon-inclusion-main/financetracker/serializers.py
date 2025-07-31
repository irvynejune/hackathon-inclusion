from rest_framework import serializers
from .models import FinancialEntry

class FinancialEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialEntry
        fields = '__all__'
        # Remove read_only_fields to allow all fields to be writable