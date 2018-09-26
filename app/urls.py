from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from app.views import Home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('wip/', include('wip.urls')),
    path('', Home.as_view(), name='home')
]

if settings.DEBUG:  # pragma: no cover
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    urlpatterns += [
        path('__404/', TemplateView.as_view(template_name='404.html')),
        path('__500/', TemplateView.as_view(template_name='500.html')),
    ]

    import debug_toolbar

    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]

handler404 = 'app.views.error404'
handler500 = 'app.views.error500'
