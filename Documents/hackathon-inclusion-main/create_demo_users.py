#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'heva_backend.settings')
django.setup()

from userauth.models import User

def create_demo_users():
    """Create demo users for different user types"""
    
    # Demo Creative User
    creative_user, created = User.objects.get_or_create(
        email='demo@example.com',
        defaults={
            'username': 'demo@example.com',
            'full_name': 'Demo Creative User',
            'user_type': 'creative',
            'primary_identity': 'creative',
            'consent_data_collection': True,
            'consent_contact': True,
            'creative_skills': 'Digital Art, Photography',
            'experience_level': 'intermediate',
            'preferred_medium': 'digital'
        }
    )
    if created:
        creative_user.set_password('demo123')
        creative_user.save()
        print("Created demo creative user: demo@example.com")
    else:
        print("Demo creative user already exists")
    
    # Demo Field Agent User
    agent_user, created = User.objects.get_or_create(
        email='agent@example.com',
        defaults={
            'username': 'agent@example.com',
            'full_name': 'Demo Field Agent',
            'user_type': 'field_agent',
            'primary_identity': 'creative',
            'consent_data_collection': True,
            'consent_contact': True,
            'region': 'Nairobi',
            'organization': 'HEVA Foundation',
            'experience_years': '2-5',
            'languages': 'English, Swahili',
            'specializations': 'Community Outreach'
        }
    )
    if created:
        agent_user.set_password('demo123')
        agent_user.save()
        print("Created demo field agent user: agent@example.com")
    else:
        print("Demo field agent user already exists")
    
    # Demo Admin User
    admin_user, created = User.objects.get_or_create(
        email='admin@example.com',
        defaults={
            'username': 'admin@example.com',
            'full_name': 'Demo Admin User',
            'user_type': 'admin',
            'primary_identity': 'creative',
            'consent_data_collection': True,
            'consent_contact': True,
            'department': 'IT',
            'role': 'system_admin',
            'access_level': 'admin'
        }
    )
    if created:
        admin_user.set_password('demo123')
        admin_user.save()
        print("Created demo admin user: admin@example.com")
    else:
        print("Demo admin user already exists")

if __name__ == '__main__':
    create_demo_users()
    print("Demo users created successfully!") 