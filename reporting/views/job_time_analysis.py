from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Q, Sum, Min, Max
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import JobTimeAnalysisFilterForm
from wip.models import Task, TimeEntry


class JobTimeAnalysis(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/job_time_analysis.html'
    date_from = None
    date_to = None

    def dispatch(self, request, *args, **kwargs):
        self.default_dates = self.get_default_dates() 
        return super().dispatch(request, *args, **kwargs)

    def get_default_dates(self):
        return TimeEntry.objects.aggregate(
            from_date=Min('started_at__date'), to_date=Max('ended_at__date')
        )

    def assign_form_dates_or_default(self, form):
        if self.date_from is None:
            self.date_from = form.cleaned_data.get('date_from') or self.default_dates['from_date']

        if self.date_to is None:
            self.date_to = form.cleaned_data.get('date_to') or self.default_dates['to_date']

    def get_filter_form(self):
        if 'job' in self.request.GET:
            return JobTimeAnalysisFilterForm(self.request.GET)
        return JobTimeAnalysisFilterForm()

    def get_time_by_staff(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            self.assign_form_dates_or_default(form)

            date_from = self.date_from
            date_to = self.date_to
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
            self.assign_form_dates_or_default(form)

            date_from = self.date_from
            date_to = self.date_to
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
