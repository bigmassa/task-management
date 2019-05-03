from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Q, Prefetch, Sum, Min, Max
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import TaskAnalysisFilterForm
from wip.models import Client, Job, Task, TimeEntry


class TaskAnalysis(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/task_analysis.html'
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
        if 'date_from' in self.request.GET:
            return TaskAnalysisFilterForm(self.request.GET)
        return TaskAnalysisFilterForm()

    def get_time_totals(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()
        if not form.is_valid():
            return TimeEntry.objects.none()

        self.assign_form_dates_or_default(form)

        date_from = self.date_from
        date_to = self.date_to
        task = form.cleaned_data.get('task')
        user = form.cleaned_data.get('user')

        filters = Q().add(Q(started_at__date__range=(date_from, date_to)), Q.AND)
        if task:
            filters.add(Q(task=task.pk), Q.AND)
        if user:
            filters.add(Q(user=user), Q.AND)

        return (
            TimeEntry.objects
            .filter(filters)
            .aggregate(
                total_time=Sum(F('ended_at') - F('started_at')),
                chargeable_time=Sum(
                    F('ended_at') - F('started_at'),
                    filter=Q(task__not_chargeable=False)
                )
            )
        )

    def get_time_by_staff(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()
        if not form.is_valid():
            return User.objects.none()

        self.assign_form_dates_or_default(form)

        date_from = self.date_from
        date_to = self.date_to
        task = form.cleaned_data.get('task')
        user = form.cleaned_data.get('user')

        filters = Q().add(Q(time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
        if task:
            filters.add(Q(time_entries__task=task.pk), Q.AND)
        if user:
            filters.add(Q(time_entries__user=user), Q.AND)

        return (
            User.objects
            .annotate(
                total_time=Sum(
                    F('time_entries__ended_at') - F('time_entries__started_at'),
                    filter=filters
                ),
                chargeable_time=Sum(
                    F('time_entries__ended_at') - F('time_entries__started_at'),
                    filter=filters & Q(time_entries__task__not_chargeable=False)
                )
            )
            .filter(total_time__isnull=False)
        )

    def get_time_entries(self):
        """ Get time by task for the allocated period """

        form = self.get_filter_form()
        if not form.is_valid():
            return TimeEntry.objects.none()

        self.assign_form_dates_or_default(form)

        date_from = self.date_from
        date_to = self.date_to
        task = form.cleaned_data.get('task')
        user = form.cleaned_data.get('user')

        time_entry_filters = Q().add(Q(started_at__date__range=(date_from, date_to)), Q.AND)
        if task:
            time_entry_filters.add(Q(task=task.pk), Q.AND)
        if user:
            time_entry_filters.add(Q(user=user), Q.AND)

        return (
            TimeEntry.objects
            .filter(time_entry_filters)
            .order_by('user', 'started_at')
            .select_related('user')
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'form': self.get_filter_form(),
            'totals': self.get_time_totals(),
            'by_staff': self.get_time_by_staff(),
            'entries': self.get_time_entries()
        })

        return context
