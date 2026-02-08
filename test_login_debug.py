#!/usr/bin/env python
"""
Test both register and login to find which fails
"""
import requests
import json

BACKEND = "http://127.0.0.1:8001"
TEST_EMAIL = "debugtest@example.com"
TEST_PASSWORD = "testpass123"

def test_register():
    """Test registration"""
    print("\n" + "="*60)
    print("1. TESTING REGISTRATION")
    print("="*60)
    
    url = f"{BACKEND}/api/auth/register"
    payload = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
    
    try:
        r = requests.post(url, json=payload, timeout=10)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text[:500]}")
        
        if r.status_code == 200:
            data = r.json()
            print(f"✓ Registration successful!")
            return data.get('user', {}).get('id')
        elif r.status_code == 409:
            print(f"⚠ User already exists - will use for login test")
            return None
        else:
            print(f"✗ Registration failed")
            return None
    except Exception as e:
        print(f"✗ Error: {e}")
        return None

def test_login():
    """Test login"""
    print("\n" + "="*60)
    print("2. TESTING LOGIN")
    print("="*60)
    
    url = f"{BACKEND}/api/auth/login"
    payload = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
    
    try:
        print(f"Sending: POST {url}")
        print(f"Payload: {json.dumps(payload)}")
        print("Waiting for response (30s timeout)...")
        
        r = requests.post(url, json=payload, timeout=30)
        print(f"✓ Got response!")
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text[:500]}")
        
        if r.status_code == 200:
            data = r.json()
            token = data.get('access_token', 'N/A')[:50]
            print(f"✓ Login successful!")
            print(f"Token: {token}...")
            return True
        else:
            print(f"✗ Login failed with status {r.status_code}")
            return False
    except requests.Timeout:
        print(f"✗ LOGIN TIMEOUT (30s) - backend is hanging on login!")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    print("\n" + "="*60)
    print("AUTH FLOW TEST")
    print("="*60)
    
    test_register()
    test_login()
    
    print("\n" + "="*60)
    print("END TEST")
    print("="*60)
