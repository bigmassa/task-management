from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from authentication.models import User


class Cloc(LoginRequiredMixin, TemplateView):
    template_name = 'wip/cloc.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'users': User.objects
        })
        return context
