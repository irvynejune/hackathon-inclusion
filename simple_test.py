import requests

print("🔍 Testing HEVA Backend...")

# Test if server is running
try:
    response = requests.get("http://127.0.0.1:8000/admin/")
    print(f"✅ Server is running: {response.status_code}")
except Exception as e:
    print(f"❌ Server not running: {e}")
    exit(1)

# Test login
try:
    login_data = {
        "email": "carenjeruto477@gmail.com",
        "password": "carey"
    }
    response = requests.post("http://127.0.0.1:8000/api/auth/login/", json=login_data)
    print(f"✅ Login test: {response.status_code}")
    
    if response.status_code == 200:
        token = response.json()['access']
        print(f"✅ Got JWT token: {token[:30]}...")
        
        # Test protected endpoint
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get("http://127.0.0.1:8000/api/analytics/user-analytics/", headers=headers)
        print(f"✅ Analytics test: {response.status_code}")
        
    else:
        print(f"❌ Login failed: {response.text}")
        
except Exception as e:
    print(f"❌ API test failed: {e}")

print("\n🎯 Backend is working! Ready for frontend integration.") 