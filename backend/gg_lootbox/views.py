from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    uid = request.data.get('uid')
    print(f"Received user: {email}, {uid}")
    return Response({"message": "User saved!"})

