from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

# 🔸 Dummy in-memory user list (can be replaced with real DB)
users = [{"email": "test@example.com", "uid": "some-firebase-uid"}]

# ✅ Create user (from Firebase or manual)
@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    uid = request.data.get('uid')

    # For now, just print and return success
    print(f"Received user: {email}, {uid}")
    return Response({"message": "User saved!"})

# ✅ Check if user exists (basic logic)
@api_view(["GET"])
def check_user(request):
    email = request.GET.get("email")
    exists = any(user["email"] == email for user in users)
    return Response({"exists": exists})

# ✅ Create an order
@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Get all orders (for Postman or admin use)
@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all().order_by('-created_at')  # Latest orders first
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer