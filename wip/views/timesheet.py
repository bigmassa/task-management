from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from authentication.models import User


class Timesheet(LoginRequiredMixin, TemplateView):
    template_name = 'wip/timesheet.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'users': User.objects.filter(is_active=True)
        })
        return context
