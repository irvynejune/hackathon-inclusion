import numpy as np
from datetime import datetime, timedelta
from userauth.models import User
from financetracker.models import FinancialEntry
from storymanager.models import Story
from .models import UserAnalytics

class CreditScoringML:
    def calculate_credit_score(self, user):
        """Real-time alternative credit scoring"""
        try:
            # Get user's financial data
            entries = FinancialEntry.objects.filter(user=user)
            if not entries.exists():
                return 'Low'
            
            # Calculate financial metrics
            total_income = sum([e.amount for e in entries if e.entry_type == 'income'])
            total_expenses = sum([e.amount for e in entries if e.entry_type == 'expense'])
            income_frequency = entries.filter(entry_type='income').count()
            
            # ML-based scoring logic
            if total_income > 10000 and income_frequency > 5:
                return 'High'
            elif total_income > 5000 and income_frequency > 3:
                return 'Medium'
            else:
                return 'Low'
        except Exception as e:
            return 'Low'

class InclusionAnalysisML:
    def calculate_inclusion_score(self, user):
        """Real-time inclusion analysis"""
        try:
            score = 0
            
            # Device adaptation
            if user.primary_device:
                score += 20
            
            # Literacy level
            if user.literacy_level:
                score += 20
            
            # Social proof
            if user.social_proof and user.social_proof.get('reference_name'):
                score += 20
            
            # Story engagement
            stories = Story.objects.filter(user=user)
            if stories.exists():
                score += 20
            
            # Financial engagement
            entries = FinancialEntry.objects.filter(user=user)
            if entries.exists():
                score += 20
            
            return min(score, 100)
        except Exception as e:
            return 0

class RealTimeAnalytics:
    def __init__(self):
        self.credit_ml = CreditScoringML()
        self.inclusion_ml = InclusionAnalysisML()
    
    def update_user_analytics(self, user):
        """Real-time user analytics update"""
        try:
            analytics, created = UserAnalytics.objects.get_or_create(user=user)
            
            # Update credit score
            analytics.credit_score = self.credit_ml.calculate_credit_score(user)
            
            # Update inclusion score
            analytics.inclusion_score = self.inclusion_ml.calculate_inclusion_score(user)
            
            # Calculate risk level
            if analytics.credit_score == 'High' and analytics.inclusion_score > 80:
                analytics.risk_level = 'Low'
            elif analytics.credit_score == 'Medium' and analytics.inclusion_score > 60:
                analytics.risk_level = 'Medium'
            else:
                analytics.risk_level = 'High'
            
            analytics.save()
            return analytics
        except Exception as e:
            return None 