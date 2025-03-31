from django.contrib import admin
from .models import Order, Product  # ✅ import your models here

# ✅ Register both models
admin.site.register(Order)
admin.site.register(Product)
