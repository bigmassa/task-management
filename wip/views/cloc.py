from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class Cloc(LoginRequiredMixin, TemplateView):
    template_name = 'wip/cloc.html'
