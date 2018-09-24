from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView, UpdateView, DeleteView

from wip.models import Task, TaskNote
from wip.views.mixins import ProtectedDeleteMixin


class TaskNoteCreate(LoginRequiredMixin, CreateView):
    fields = ['note']
    model = TaskNote
    template_name = 'wip/tasknote_add.html'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        task = get_object_or_404(Task, pk=self.kwargs['pk'])
        kwargs.update({
            'instance': TaskNote(task=task)
        })
        return kwargs

    def get_success_url(self):
        return self.object.task.get_absolute_url()


class TaskNoteDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteView):
    model = TaskNote

    def get_success_url(self):
        return self.object.task.get_absolute_url()


class TaskNoteUpdate(LoginRequiredMixin, UpdateView):
    fields = ['note']
    model = TaskNote
    template_name = 'wip/tasknote_update.html'

    def get_success_url(self):
        return self.object.task.get_absolute_url()
