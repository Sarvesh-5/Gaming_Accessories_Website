from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import create_user, check_user, create_order, get_orders, ProductViewSet

# ✅ Register the product API
router = DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
    path("api/users/", create_user),
    path("api/users/check/", check_user),
    path("api/orders/", create_order),
    path("api/orders/all/", get_orders),
    path("api/", include(router.urls)),  # ✅ This line adds /api/products/
]
