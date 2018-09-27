import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import DeleteView
from django.views.generic.base import View

from wip.models import Job, JobFile
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


class JobFileDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = JobFile

    def get_success_url(self):
        return self.object.job.get_absolute_url()


class JobFileUpload(LoginRequiredMixin, View):

    def render_json_response(self, context_dict, status=200):
        json_context = json.dumps(context_dict, cls=DjangoJSONEncoder).encode('utf-8')
        return HttpResponse(json_context, content_type='application/json', status=status)

    def post(self, request, *args, **kwargs):
        job = get_object_or_404(Job, pk=self.kwargs['pk'])
        file = JobFile.objects.create(job=job, file=request.FILES['file'])
        response_dict = {
            'pk': file.pk,
            'name': str(file),
            'url': file.file.url,
            'size_mb': file.size_mb
        }
        return self.render_json_response(response_dict, status=200)
