from django.contrib import admin
from .models import Product, ProductDetail, FAQ, Review, Order
from .models import ProductImage


admin.site.register(Order)
admin.site.register(Product)
admin.site.register(ProductDetail)
admin.site.register(FAQ)
admin.site.register(Review)
admin.site.register(ProductImage)