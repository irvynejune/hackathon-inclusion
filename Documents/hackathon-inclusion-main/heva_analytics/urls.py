from django.urls import path
from .views import UserAnalyticsView, DashboardAnalyticsView

urlpatterns = [
    path('user-analytics/', UserAnalyticsView.as_view(), name='user-analytics'),
    path('dashboard/', DashboardAnalyticsView.as_view(), name='dashboard-analytics'),
] 