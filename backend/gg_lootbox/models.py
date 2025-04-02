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


class ProductDetail(models.Model):
    product = models.OneToOneField('Product', on_delete=models.CASCADE, related_name='detail')
    mrp = models.FloatField()
    rating = models.FloatField()
    reviews = models.IntegerField()
    availability = models.CharField(max_length=100)
    seller = models.CharField(max_length=255)
    delivery = models.CharField(max_length=255)
    about = models.JSONField()
    description = models.JSONField()

class FAQ(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='faqs')
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return f"FAQ for {self.product.title}"

class Review(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='reviews_list')
    user = models.CharField(max_length=100)
    comment = models.TextField()
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product.title} by {self.user}"

class ProductImage(models.Model):
    product_detail = models.ForeignKey('ProductDetail', on_delete=models.CASCADE, related_name='product_images')
    image = models.ImageField(upload_to='products/details/')

    def __str__(self):
        return f"Image for {self.product_detail.product.title}"

