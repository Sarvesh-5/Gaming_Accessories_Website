from django.urls import path
from .views import create_user
from .views import check_user

urlpatterns = [
    path("api/users/", create_user),
    path("api/users/check/", check_user),

]
