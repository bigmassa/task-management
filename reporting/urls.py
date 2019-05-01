from django.urls import path

from reporting import views


app_name = 'reporting'
urlpatterns = [
    path('',
         views.List.as_view(),
         name='list'),
    path('autocomplete/clients/',
         views.AutoCompleteClient.as_view(),
         name='autocomplete-client'),
    path('autocomplete/jobs/',
         views.AutoCompleteJob.as_view(),
         name='autocomplete-job'),
    path('autocomplete/tasks/',
         views.AutoCompleteTask.as_view(),
         name='autocomplete-task'),
    path('job-time-analysis/',
         views.JobTimeAnalysis.as_view(),
         name='job-time-analysis'),
    path('moneyworks-timesheet-export/',
         views.MoneyworksTimesheetExport.as_view(),
         name='moneyworks-timesheet-export'),
    path('timesheet-analysis/',
         views.TimesheetAnalysis.as_view(),
         name='timesheet-analysis'),
    path('task-analysis/',
         views.TaskAnalysis.as_view(),
         name='task-analysis'),
]
