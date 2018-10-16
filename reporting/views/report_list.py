from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class ReportList(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/report_list.html'
