from django.urls import path

from wip import views


app_name = 'wip'

urlpatterns = [
    path('clients/', views.ClientList.as_view(), name='client-list'),
    path('clients/create/', views.ClientCreate.as_view(), name='client-create'),
    path('clients/<int:pk>/update/', views.ClientUpdate.as_view(), name='client-update'),
    path('clients/<int:pk>/delete/', views.ClientDelete.as_view(), name='client-delete'),
    path('jobs/', views.JobList.as_view(), name='job-list'),
    path('jobs/<int:pk>/', views.JobDetail.as_view(), name='job-detail'),
]
