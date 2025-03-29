from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Dummy in-memory "database"
users = [{"email": "test@example.com", "uid": "some-firebase-uid"}]
@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    uid = request.data.get('uid')
    print(f"Received user: {email}, {uid}")
    return Response({"message": "User saved!"})

@api_view(["GET"])
def check_user(request):
    email = request.GET.get("email")
    exists = any(user["email"] == email for user in users)
    return Response({"exists": exists})
