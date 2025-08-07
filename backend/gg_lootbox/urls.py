from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet 
from .views import (
    create_user, check_user, create_order, get_orders,
    ProductViewSet, ProductDetailViewSet,
    FAQViewSet,  
    get_product_details
)

# Create a router and register the ViewSets
router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('productdetail', ProductDetailViewSet)
router.register('faq', FAQViewSet)  
router.register('review', ReviewViewSet)

urlpatterns = [
    path("api/users/", create_user),
    path("api/users/check/", check_user),
    path("api/orders/", create_order),
    path("api/orders/all/", get_orders),
    path("api/", include(router.urls)),  # This includes /api/products/ and /api/productdetail/
    path("api/product/<slug:slug>/", get_product_details, name="get_product_details"),
]
