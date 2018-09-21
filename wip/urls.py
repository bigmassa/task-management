from django.urls import path

from wip import views


app_name = 'wip'

urlpatterns = [
    path('clients/', views.ClientList.as_view(), name='client-list'),
    path('clients/<int:pk>/', views.ClientDetail.as_view(), name='client-detail'),
    path('clients/create/', views.ClientCreate.as_view(), name='client-create'),
    path('clients/<int:pk>/update/', views.ClientUpdate.as_view(), name='client-update'),
    path('clients/<int:pk>/delete/', views.ClientDelete.as_view(), name='client-delete'),
    path('clients/<int:pk>/jobs/create/', views.JobCreate.as_view(), name='job-create'),
    path('jobs/<int:pk>/', views.JobDetail.as_view(), name='job-detail'),
    path('jobs/<int:pk>/update/', views.JobUpdate.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', views.JobDelete.as_view(), name='job-delete'),
]
