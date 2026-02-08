import requests
r = requests.post('http://127.0.0.1:8001/api/auth/register', json={'email':'testuser@example.com','password':'testpassword123'})
print('Status:', r.status_code)
print('Body:', r.text)
