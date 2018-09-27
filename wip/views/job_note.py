from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView, UpdateView, DeleteView

from wip.models import Job, JobNote
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


class JobNoteCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    fields = ['note']
    model = JobNote
    success_message = "Created successfully"
    template_name = 'wip/jobnote_add.html'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        job = get_object_or_404(Job, pk=self.kwargs['pk'])
        kwargs.update({
            'instance': JobNote(job=job)
        })
        return kwargs

    def get_success_url(self):
        return self.object.job.get_absolute_url()


class JobNoteDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = JobNote

    def get_success_url(self):
        return self.object.job.get_absolute_url()


class JobNoteUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    fields = ['note']
    model = JobNote
    success_message = "Updated successfully"
    template_name = 'wip/jobnote_update.html'

    def get_success_url(self):
        return self.object.job.get_absolute_url()
