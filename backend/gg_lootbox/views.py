from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer
from .serializers import FAQSerializer
from rest_framework import viewsets
from .serializers import ProductSerializer, ProductDetailSerializer, FAQSerializer, ReviewSerializer
from .models import Product, ProductDetail, FAQ, Review
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
    lookup_field = 'slug'




@api_view(['GET'])
def get_product_details(request, slug):
    try:
        product = Product.objects.get(slug=slug)
        details = ProductDetail.objects.get(product=product)
        faqs = FAQ.objects.filter(product=product)
        reviews = Review.objects.filter(product=product)

        return Response({
            "product": ProductSerializer(product).data,
            "details": ProductDetailSerializer(details).data,
            "faqs": FAQSerializer(faqs, many=True).data,
            "reviews": ReviewSerializer(reviews, many=True).data,
        })
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    
class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer
class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer