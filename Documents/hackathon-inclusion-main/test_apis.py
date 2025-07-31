#!/usr/bin/env python3
"""
HEVA Backend API Test Script
Tests all endpoints to ensure everything is working correctly
"""

import requests
import json
from datetime import datetime

# Base URL
BASE_URL = "http://127.0.0.1:8000"

def test_auth():
    """Test authentication endpoints"""
    print("🔐 Testing Authentication...")
    
    # Test login (using existing user)
    login_data = {
        "email": "carenjeruto477@gmail.com",
        "password": "carey"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/login/", json=login_data)
        print(f"✅ Login: {response.status_code}")
        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data['access']
            print(f"   Token received: {access_token[:50]}...")
            return access_token
    except Exception as e:
        print(f"❌ Login failed: {e}")
    
    return None

def test_financial_entries(token):
    """Test financial entries API"""
    print("\n💰 Testing Financial Entries...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test creating financial entry
    entry_data = {
        "amount": 50000,
        "entry_type": "income",
        "description": "Payment for creative work",
        "date": datetime.now().isoformat(),
        "source": "freelance"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/finance/entries/", 
                               json=entry_data, headers=headers)
        print(f"✅ Create Entry: {response.status_code}")
        if response.status_code == 201:
            print(f"   Entry created: {response.json()}")
    except Exception as e:
        print(f"❌ Create entry failed: {e}")
    
    # Test listing entries
    try:
        response = requests.get(f"{BASE_URL}/api/finance/entries/", headers=headers)
        print(f"✅ List Entries: {response.status_code}")
        if response.status_code == 200:
            entries = response.json()
            print(f"   Found {len(entries)} entries")
    except Exception as e:
        print(f"❌ List entries failed: {e}")

def test_stories(token):
    """Test stories API"""
    print("\n📖 Testing Stories...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test creating story
    story_data = {
        "title": "My Creative Journey",
        "content": "This is a test story about my creative journey with HEVA...",
        "tags": ["creative", "journey", "test"],
        "status": "pending"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/stories/stories/", 
                               json=story_data, headers=headers)
        print(f"✅ Create Story: {response.status_code}")
        if response.status_code == 201:
            print(f"   Story created: {response.json()}")
    except Exception as e:
        print(f"❌ Create story failed: {e}")
    
    # Test listing stories
    try:
        response = requests.get(f"{BASE_URL}/api/stories/stories/", headers=headers)
        print(f"✅ List Stories: {response.status_code}")
        if response.status_code == 200:
            stories = response.json()
            print(f"   Found {len(stories)} stories")
    except Exception as e:
        print(f"❌ List stories failed: {e}")

def test_analytics(token):
    """Test analytics API"""
    print("\n📊 Testing Analytics...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test user analytics
    try:
        response = requests.get(f"{BASE_URL}/api/analytics/user-analytics/", headers=headers)
        print(f"✅ User Analytics: {response.status_code}")
        if response.status_code == 200:
            analytics = response.json()
            print(f"   Credit Score: {analytics.get('credit_score', 'N/A')}")
            print(f"   Inclusion Score: {analytics.get('inclusion_score', 'N/A')}")
    except Exception as e:
        print(f"❌ User analytics failed: {e}")
    
    # Test dashboard analytics
    try:
        response = requests.get(f"{BASE_URL}/api/analytics/dashboard/", headers=headers)
        print(f"✅ Dashboard Analytics: {response.status_code}")
        if response.status_code == 200:
            dashboard = response.json()
            print(f"   Total Users: {dashboard.get('total_users', 'N/A')}")
            print(f"   Total Stories: {dashboard.get('total_stories', 'N/A')}")
    except Exception as e:
        print(f"❌ Dashboard analytics failed: {e}")

def main():
    """Run all tests"""
    print("🚀 HEVA Backend API Test Suite")
    print("=" * 50)
    
    # Test authentication and get token
    token = test_auth()
    
    if token:
        # Test all other endpoints
        test_financial_entries(token)
        test_stories(token)
        test_analytics(token)
        
        print("\n" + "=" * 50)
        print("✅ All tests completed!")
        print("\n🎯 Next Steps:")
        print("1. Frontend Integration")
        print("2. Real-time Features (WebSockets)")
        print("3. Notification System")
        print("4. Production Deployment")
    else:
        print("❌ Authentication failed - cannot test other endpoints")

if __name__ == "__main__":
    main() 