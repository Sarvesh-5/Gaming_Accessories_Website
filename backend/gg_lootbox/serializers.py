from rest_framework import serializers
from .models import Order, Product, ProductDetail, FAQ, Review
from .models import ProductImage


# ✅ Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# ✅ ProductDetail Serializer
class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = '__all__'

# ✅ FAQ Serializer
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

# ✅ Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

# ✅ Product Serializer with nested detail, faqs, reviews
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.CharField(required=False)  # ✅ Accept string paths instead of file uploads

    detail = ProductDetailSerializer(read_only=True)
    faqs = FAQSerializer(many=True, read_only=True)
    reviews_list = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']
class ProductDetailSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = ProductDetail
        fields = '__all__'
