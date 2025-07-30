from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Count, Avg, Sum
from django.utils import timezone
from datetime import timedelta
from .models import UserAnalytics, InclusionMetrics
from .serializers import UserAnalyticsSerializer, InclusionMetricsSerializer
from .ml_service import RealTimeAnalytics
from userauth.models import User
from financetracker.models import FinancialEntry
from storymanager.models import Story

# Create your views here.

class UserAnalyticsView(generics.RetrieveAPIView):
    serializer_class = UserAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        analytics_service = RealTimeAnalytics()
        return analytics_service.update_user_analytics(user)

class DashboardAnalyticsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        """Real-time dashboard analytics"""
        try:
            # User demographics
            total_users = User.objects.count()
            marginalized_users = User.objects.filter(marginalized_groups__contains=['refugee']).count()
            pwd_users = User.objects.filter(disability=True).count()
            lgbtqi_users = User.objects.filter(marginalized_groups__contains=['LGBTQI+']).count()
            
            # Financial analytics
            total_income = FinancialEntry.objects.filter(entry_type='income').aggregate(Sum('amount'))['amount__sum'] or 0
            total_expenses = FinancialEntry.objects.filter(entry_type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
            
            # Story analytics
            total_stories = Story.objects.count()
            approved_stories = Story.objects.filter(status='approved').count()
            urgent_stories = Story.objects.filter(tags__contains=['urgency']).count()
            
            # Real-time metrics
            today = timezone.now().date()
            new_users_today = User.objects.filter(date_joined__date=today).count()
            new_stories_today = Story.objects.filter(date_submitted__date=today).count()
            
            return Response({
                'user_demographics': {
                    'total_users': total_users,
                    'marginalized_users': marginalized_users,
                    'pwd_users': pwd_users,
                    'lgbtqi_users': lgbtqi_users,
                    'new_users_today': new_users_today,
                },
                'financial_analytics': {
                    'total_income': float(total_income),
                    'total_expenses': float(total_expenses),
                    'net_flow': float(total_income - total_expenses),
                },
                'story_analytics': {
                    'total_stories': total_stories,
                    'approved_stories': approved_stories,
                    'urgent_stories': urgent_stories,
                    'new_stories_today': new_stories_today,
                },
                'inclusion_metrics': {
                    'marginalized_percentage': (marginalized_users / total_users * 100) if total_users > 0 else 0,
                    'pwd_percentage': (pwd_users / total_users * 100) if total_users > 0 else 0,
                    'lgbtqi_percentage': (lgbtqi_users / total_users * 100) if total_users > 0 else 0,
                }
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
