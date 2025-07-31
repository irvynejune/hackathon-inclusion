from rest_framework import serializers
from .models import UserAnalytics, InclusionMetrics

class UserAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnalytics
        fields = '__all__'

class InclusionMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InclusionMetrics
        fields = '__all__' 