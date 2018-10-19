import csv

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.generic.edit import ProcessFormView

from reporting.forms import DateFilterForm
from wip.models import TimeEntry
from wip.utils import duration_to_decimal_hrs


class MoneyworksTimesheetExport(LoginRequiredMixin, ProcessFormView, TemplateView):
    template_name = 'reporting/moneyworks_timesheet_export.html'

    def get_form(self):
        if self.request.method == 'POST':
            return DateFilterForm(self.request.POST)
        return DateFilterForm()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'form' not in kwargs:
            context['form'] = self.get_form()
        return context

    def form_valid(self, form):
        response = HttpResponse(content_type='text/csv')
        date_from = form.cleaned_data['date_from']
        date_to = form.cleaned_data['date_to']
        file_name = '%s-%s.csv' % (date_from, date_to)
        response['Content-Disposition'] = 'attachment; filename="%s"' % file_name

        writer = csv.writer(response)

        entries = TimeEntry.objects.filter(
            started_at__date__gte=date_from,
            ended_at__date__lte=date_to
        ).select_related(
            'task',
            'user'
        )

        for entry in entries:
            writer.writerow(
                [
                    entry.task.job_id,
                    duration_to_decimal_hrs(entry.duration),
                    'UT',
                    '',
                    entry.started_at.strftime('%d/%m/%Y'),
                    entry.user.moneyworks_cost_centre,
                    '',
                    '',
                    '',
                    '',
                    '%s%s' % (entry.task, ': %s' % entry.comments if entry.comments else '')
                ]
            )

        return response

    def form_invalid(self, form):
        context = self.get_context_data(form=form)
        return self.render_to_response(context)
