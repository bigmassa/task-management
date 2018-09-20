from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView

from wip.models import Job


class JobDetail(LoginRequiredMixin, DetailView):
    model = Job
