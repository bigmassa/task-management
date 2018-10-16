from django.urls import path

from reporting import views


app_name = 'reporting'
urlpatterns = [
    path('', views.ReportList.as_view(), name='report-list'),
    path('job-time-analysis/', views.JobTimeAnalysisReport.as_view(), name='report-job-time-analysis'),
]
