from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from wip.models import Client


class Cloc(LoginRequiredMixin, TemplateView):
    template_name = 'wip/cloc.html'

    def get_client_queryset(self):
        return Client.objects.prefetch_related('jobs__tasks').all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'clients': self.get_client_queryset()
        })
        return context
