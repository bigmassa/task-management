from django.urls import path, include

from wip import api, routers, views


# API
API_TITLE = 'WIP API'
API_DESCRIPTION = 'WIP API Documentation'

router = routers.DefaultRouter()
router.register(r'clients', api.ClientViewSet)
router.register(r'jobs', api.JobViewSet)
router.register(r'tasks', api.TaskViewSet)
router.register(r'time-entries', api.TimeEntryViewSet)

# DESKTOP
app_name = 'wip'
urlpatterns = [
    path('api/', include(router.urls)),
    path('make-call/<telephone_number>/', views.MakeCall.as_view(), name='make-call'),
    path('clients/', views.ClientList.as_view(), name='client-list-view'),
    path('clients/<int:pk>/', views.ClientDetail.as_view(), name='client-detail'),
    path('clients/create/', views.ClientCreate.as_view(), name='client-create'),
    path('clients/<int:pk>/update/', views.ClientUpdate.as_view(), name='client-update'),
    path('clients/<int:pk>/delete/', views.ClientDelete.as_view(), name='client-delete'),
    path('clients/<int:pk>/contacts/create/', views.ClientContactCreate.as_view(), name='clientcontact-create'),
    path('clients/<int:pk>/jobs/create/', views.JobCreate.as_view(), name='job-create'),
    path('client-contacts/<int:pk>/update/', views.ClientContactUpdate.as_view(), name='clientcontact-update'),
    path('client-contacts/<int:pk>/delete/', views.ClientContactDelete.as_view(), name='clientcontact-delete'),
    path('cloc/', views.Cloc.as_view(), name='cloc'),
    path('jobs/<int:pk>/', views.JobDetail.as_view(), name='job-detail'),
    path('jobs/<int:pk>/update/', views.JobUpdate.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', views.JobDelete.as_view(), name='job-delete'),
    path('jobs/<int:pk>/files/upload/', views.JobFileUpload.as_view(), name='jobfile-upload'),
    path('jobs/<int:pk>/notes/create/', views.JobNoteCreate.as_view(), name='jobnote-create'),
    path('jobs/<int:pk>/tasks/create/', views.TaskCreate.as_view(), name='task-create'),
    path('jobs/<int:pk>/recurring-costs/update/',
         views.JobRecurringCostUpdate.as_view(),
         name='jobrecurringcost-update'),
    path('jobs/<int:pk>/relationships/update/', views.JobRelationshipUpdate.as_view(), name='jobrelationship-update'),
    path('job-files/<int:pk>/delete/', views.JobFileDelete.as_view(), name='jobfile-delete'),
    path('job-notes/<int:pk>/update/', views.JobNoteUpdate.as_view(), name='jobnote-update'),
    path('job-notes/<int:pk>/delete/', views.JobNoteDelete.as_view(), name='jobnote-delete'),
    path('tags/autocomplete/', views.TagsAutocomplete.as_view(), name='tag-autocomplete'),
    path('tasks/<int:pk>/', views.TaskDetail.as_view(), name='task-detail'),
    path('tasks/<int:pk>/update/', views.TaskUpdate.as_view(), name='task-update'),
    path('tasks/<int:pk>/delete/', views.TaskDelete.as_view(), name='task-delete'),
    path('tasks/<int:pk>/assignees/update/', views.TaskAssigneeUpdate.as_view(), name='taskassignee-update'),
    path('tasks/<int:pk>/notes/create/', views.TaskNoteCreate.as_view(), name='tasknote-create'),
    path('task-notes/<int:pk>/update/', views.TaskNoteUpdate.as_view(), name='tasknote-update'),
    path('task-notes/<int:pk>/delete/', views.TaskNoteDelete.as_view(), name='tasknote-delete'),
]
