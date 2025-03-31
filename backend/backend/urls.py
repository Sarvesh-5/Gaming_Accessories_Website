from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static  # ✅ required to show uploaded images

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('gg_lootbox.urls')),
]

# ✅ This line enables image file serving during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
