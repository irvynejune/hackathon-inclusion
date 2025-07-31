from django.db import models
from userauth.models import User
from financetracker.models import FinancialEntry
from storymanager.models import Story

class UserAnalytics(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='analytics')
    credit_score = models.CharField(max_length=20, default='pending')  # Low/Medium/High
    risk_level = models.CharField(max_length=20, default='pending')  # Low/Medium/High
    inclusion_score = models.IntegerField(default=0)  # 0-100
    last_updated = models.DateTimeField(auto_now=True)
    
    # ML Features
    financial_consistency = models.FloatField(default=0.0)
    story_engagement = models.FloatField(default=0.0)
    device_adaptation = models.FloatField(default=0.0)
    
    def __str__(self):
        return f'{self.user.email} - Credit: {self.credit_score} - Risk: {self.risk_level}'

class InclusionMetrics(models.Model):
    date = models.DateField(auto_now_add=True)
    total_users = models.IntegerField(default=0)
    marginalized_users = models.IntegerField(default=0)
    refugee_users = models.IntegerField(default=0)
    pwd_users = models.IntegerField(default=0)
    lgbtqi_users = models.IntegerField(default=0)
    creative_users = models.IntegerField(default=0)
    
    # Financial Inclusion
    avg_income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    avg_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    funding_requests = models.IntegerField(default=0)
    
    # Story Analytics
    total_stories = models.IntegerField(default=0)
    approved_stories = models.IntegerField(default=0)
    urgent_stories = models.IntegerField(default=0)
    
    def __str__(self):
        return f'Metrics for {self.date}'
