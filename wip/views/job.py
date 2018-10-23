from dal import autocomplete
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Prefetch, Q
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
            .with_allocated()
            .with_time_spent()
            .select_related(
                'client',
                'type',
                'status'
            )
            .prefetch_related(
                'notes__user',
                'relationships__user',
                'relationships__relationship',
                'recurring_costs__type',
                'recurring_costs__payment_option',
                Prefetch(
                    'tasks', (
                        Task.objects
                        .open()
                        .select_related('status')
                        .prefetch_related('assignees__user', 'tags')
                    ),
                    to_attr='open_tasks'
                )
            )
        )


class JobUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    form_class = JobForm
    model = Job
    success_message = "Updated successfully"
    template_name = 'wip/job_update.html'


class JobAutocomplete(autocomplete.Select2QuerySetView):
    model = Job
    paginate_by = 50

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return self.model.objects.none()

        qs = self.model.objects.all()

        client = self.forwarded.get('client', None)

        if client:
            qs = qs.filter(client_id=client)
        else:
            qs = self.model.objects.none()

        if self.q:
            qs = qs.filter(Q(pk__icontains=self.q) | Q(title__icontains=self.q))

        return qs

    def get_result_label(self, item):
        return item.full_title

    def has_add_permission(self, request):
        return False
