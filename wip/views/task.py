from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django.views.generic import DetailView, CreateView, UpdateView, DeleteView

from wip.forms.task import TaskForm
from wip.models import Job, Task, TaskAssignee, TaskNote
from wip.views.mixins import ProtectedDeleteMixin


class TaskCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    form_class = TaskForm
    model = Task
    success_message = "Created successfully"
    template_name = 'wip/task_add.html'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        job = get_object_or_404(Job, pk=self.kwargs['pk'])
        kwargs.update({
            'instance': Task(job=job)
        })
        return kwargs


class TaskDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteView):
    model = Task

    def get_success_url(self):
        return self.object.job.get_absolute_url()


class TaskDetail(LoginRequiredMixin, DetailView):
    model = Task

    def get_queryset(self):
        return (
            super().get_queryset()
            .select_related(
                'job__client',
                'status'
            )
            .prefetch_related(
                Prefetch(
                    'assignees',
                    TaskAssignee.objects.select_related('user')
                ),
                Prefetch(
                    'notes',
                    TaskNote.objects.select_related('user')
                )
            )
        )


class TaskUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    form_class = TaskForm
    model = Task
    success_message = "Updated successfully"
    template_name = 'wip/task_update.html'
