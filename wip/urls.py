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
    path('jobs/<int:pk>/tasks/create/', views.TaskCreate.as_view(), name='task-create'),
    path('jobs/<int:pk>/notes/create/', views.JobNoteCreate.as_view(), name='jobnote-create'),
    path('job-notes/<int:pk>/update/', views.JobNoteUpdate.as_view(), name='jobnote-update'),
    path('job-notes/<int:pk>/delete/', views.JobNoteDelete.as_view(), name='jobnote-delete'),
    path('tags/autocomplete/', views.TagsAutocomplete.as_view(), name='tag-autocomplete'),
    path('tasks/<int:pk>/', views.TaskDetail.as_view(), name='task-detail'),
    path('tasks/<int:pk>/update/', views.TaskUpdate.as_view(), name='task-update'),
    path('tasks/<int:pk>/delete/', views.TaskDelete.as_view(), name='task-delete'),
]
