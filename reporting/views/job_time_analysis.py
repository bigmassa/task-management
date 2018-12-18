from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Q, Sum
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import JobDateFilterForm
from wip.models import Task


class JobTimeAnalysis(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/job_time_analysis.html'

    def get_filter_form(self):
        if 'date_from' in self.request.GET:
            return JobDateFilterForm(self.request.GET)
        return JobDateFilterForm()

    def get_time_by_staff(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            date_from = form.cleaned_data['date_from']
            date_to = form.cleaned_data['date_to']
            job = form.cleaned_data['job']
            return (
                User.objects
                .annotate(
                    time_spent=Sum(
                        F('time_entries__ended_at') - F('time_entries__started_at'),
                        filter=(
                            Q(time_entries__started_at__date__range=(date_from, date_to)) &
                            Q(time_entries__task__job=job)
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
            date_from = form.cleaned_data['date_from']
            date_to = form.cleaned_data['date_to']
            job = form.cleaned_data['job']
            return (
                Task.objects
                .annotate(
                    time_spent_in_period=Sum(
                        F('time_entries__ended_at') - F('time_entries__started_at'),
                        filter=(
                            Q(time_entries__started_at__date__range=(date_from, date_to))
                        )
                    ),
                    time_spent_to_date=Sum(
                        F('time_entries__ended_at') - F('time_entries__started_at'),
                        filter=(
                            Q(time_entries__ended_at__date__lte=date_to)
                        )
                    )
                )
                .filter(time_spent_in_period__isnull=False, job=job)
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
