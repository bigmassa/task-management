from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import models
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import JobAnalysisFilterForm
from wip.models import Task


class JobTimeAnalysisReport(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/job_time_analysis.html'

    def get_filter_form(self):
        if 'date_from' in self.request.GET:
            return JobAnalysisFilterForm(self.request.GET)
        return JobAnalysisFilterForm()

    def get_time_by_staff(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            return (
                User.objects
                .annotate(
                    time_spent=models.Sum(
                        models.F('time_entries__ended_at') - models.F('time_entries__started_at'),
                        filter=(
                            models.Q(time_entries__started_at__date__gte=form.cleaned_data['date_from']) &
                            models.Q(time_entries__ended_at__date__lte=form.cleaned_data['date_to']) &
                            models.Q(time_entries__task__job=form.cleaned_data['job'])
                        )
                    )
                )
                .filter(time_spent__isnull=False)
            )
        return User.objects.none()

    def get_task_time_by_staff(self):
        """ Get billable time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            return (
                Task.objects
                .annotate(
                    time_spent_in_period=models.Sum(
                        models.F('time_entries__ended_at') - models.F('time_entries__started_at'),
                        filter=(
                            models.Q(time_entries__started_at__date__gte=form.cleaned_data['date_from']) &
                            models.Q(time_entries__ended_at__date__lte=form.cleaned_data['date_to'])
                        )
                    ),
                    time_spent_to_date=models.Sum(
                        models.F('time_entries__ended_at') - models.F('time_entries__started_at'),
                        filter=(
                            models.Q(time_entries__ended_at__date__lte=form.cleaned_data['date_to'])
                        )
                    )
                )
                .filter(time_spent_in_period__isnull=False, job=form.cleaned_data['job'])
            )
        return Task.objects.none()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'form': self.get_filter_form(),
            'time_by_staff': self.get_time_by_staff(),
            'billable_time_by_staff': self.get_task_time_by_staff().filter(not_chargeable=False),
            'non_billable_time_by_staff': self.get_task_time_by_staff().filter(not_chargeable=True)
        })
        return context
