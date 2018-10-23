import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import DeleteView
from django.views.generic.base import View

from wip.models import Task, TaskFile
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


class TaskFileDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = TaskFile

    def get_success_url(self):
        return self.object.task.get_absolute_url()


class TaskFileUpload(LoginRequiredMixin, View):

    def render_json_response(self, context_dict, status=200):
        json_context = json.dumps(context_dict, cls=DjangoJSONEncoder).encode('utf-8')
        return HttpResponse(json_context, content_type='application/json', status=status)

    def post(self, request, *args, **kwargs):
        task = get_object_or_404(Task, pk=self.kwargs['pk'])
        file = TaskFile.objects.create(task=task, file=request.FILES['file'])
        response_dict = {
            'pk': file.pk,
            'name': str(file),
            'url': file.file.url,
            'size_mb': file.size_mb
        }
        return self.render_json_response(response_dict, status=200)
