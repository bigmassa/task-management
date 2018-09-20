from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from wip.models import Job


class JobDetail(LoginRequiredMixin, DetailView):
    model = Job


class JobList(LoginRequiredMixin, ListView):
    model = Job
