from django.db import models

class Order(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    street = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    payment_method = models.CharField(max_length=50)
    subtotal = models.FloatField()
    discount = models.FloatField()
    delivery_charge = models.FloatField()
    total = models.FloatField()
    coupon = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_id


# ✅ Add this Product model below
class Product(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.title
