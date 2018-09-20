from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import DetailView, ListView, CreateView, UpdateView, DeleteView

from wip.models import Job
from wip.views.mixins import ProtectedDeleteMixin


class JobCreate(LoginRequiredMixin, CreateView):
    fields = '__all__'
    model = Job

    def get_success_url(self):
        return self.object.get_detail_url()


class JobDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteView):
    model = Job
    success_url = reverse_lazy('wip:job-list')


class JobDetail(LoginRequiredMixin, DetailView):
    model = Job


class JobList(LoginRequiredMixin, ListView):
    model = Job


class JobUpdate(LoginRequiredMixin, UpdateView):
    fields = '__all__'
    model = Job

    def get_success_url(self):
        return self.object.get_detail_url()
