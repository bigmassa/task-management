from django.urls import path

from reporting import views


app_name = 'reporting'
urlpatterns = [
    path('', views.List.as_view(), name='list'),
]
