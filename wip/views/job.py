from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django.views.generic import DetailView, CreateView, UpdateView, DeleteView

from wip.forms import JobForm
from wip.models import Client, Job, JobRelationship, Task, JobRecurringCost, JobNote
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


class JobCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    form_class = JobForm
    model = Job
    success_message = "Created successfully"
    template_name = 'wip/job_add.html'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        client = get_object_or_404(Client, pk=self.kwargs['pk'])
        kwargs.update({
            'instance': Job(client=client, colour=client.colour)
        })
        return kwargs


class JobDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = Job

    def get_success_url(self):
        return self.object.client.get_absolute_url()


class JobDetail(LoginRequiredMixin, DetailView):
    model = Job

    def get_queryset(self):
        return (
            super().get_queryset()
            .select_related(
                'client',
                'type',
                'status'
            )
            .prefetch_related(
                Prefetch(
                    'tasks',
                    Task.objects.all().select_related('status').prefetch_related('assignees__user', 'tags')
                ),
                Prefetch(
                    'relationships',
                    JobRelationship.objects.select_related('user', 'relationship')
                ),
                Prefetch(
                    'recurring_costs',
                    JobRecurringCost.objects.select_related('type', 'payment_option')
                ),
                Prefetch(
                    'notes',
                    JobNote.objects.select_related('user')
                )
            )
        )


class JobUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    form_class = JobForm
    model = Job
    success_message = "Updated successfully"
    template_name = 'wip/job_update.html'
