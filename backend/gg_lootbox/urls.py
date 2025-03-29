from django.urls import path
from .views import create_user

urlpatterns = [
    path("api/users/", create_user),
]
