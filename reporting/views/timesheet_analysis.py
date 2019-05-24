from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Q, Prefetch, Sum, Min, Max
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import TimesheetAnalysisFilterForm
from wip.models import Client, Job, Task, TimeEntry


class TimesheetAnalysis(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/timesheet_analysis.html'
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
            return TimesheetAnalysisFilterForm(self.request.GET)
        return TimesheetAnalysisFilterForm()

    def get_time_totals(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            self.assign_form_dates_or_default(form)

            date_from = self.date_from
            date_to = self.date_to
            client = form.cleaned_data.get('client')
            job = form.cleaned_data.get('job')
            user = form.cleaned_data.get('user')

            filters = Q().add(Q(started_at__date__range=(date_from, date_to)), Q.AND)
            if client:
                filters.add(Q(task__job__client=client), Q.AND)
            if job:
                filters.add(Q(task__job=job), Q.AND)
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
        return TimeEntry.objects.none()

    def get_time_by_staff(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            self.assign_form_dates_or_default(form)

            date_from = self.date_from
            date_to = self.date_to
            client = form.cleaned_data.get('client')
            job = form.cleaned_data.get('job')
            user = form.cleaned_data.get('user')

            filters = Q().add(Q(time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
            if client:
                filters.add(Q(time_entries__task__job__client=client), Q.AND)
            if job:
                filters.add(Q(time_entries__task__job=job), Q.AND)
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
        return User.objects.none()

    def get_time_by_client(self):
        """ Get time by task for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            self.assign_form_dates_or_default(form)

            date_from = self.date_from
            date_to = self.date_to
            client = form.cleaned_data.get('client')
            job = form.cleaned_data.get('job')
            user = form.cleaned_data.get('user')

            task_filters = Q().add(Q(time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
            if client:
                task_filters.add(Q(job__client=client), Q.AND)
            if job:
                task_filters.add(Q(job=job), Q.AND)
            if user:
                task_filters.add(Q(time_entries__user=user), Q.AND)

            task_qs = (
                Task.objects
                .annotate(
                    total_time=Sum(
                        F('time_entries__ended_at') - F('time_entries__started_at'),
                        filter=task_filters
                    ),
                    chargeable_time=Sum(
                        F('time_entries__ended_at') - F('time_entries__started_at'),
                        filter=task_filters & Q(not_chargeable=False)
                    )
                )
                .filter(total_time__isnull=False)
                .order_by('-total_time')
            )

            job_filters = Q().add(Q(tasks__time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
            if client:
                job_filters.add(Q(client=client), Q.AND)
            if job:
                job_filters.add(Q(id=job.pk), Q.AND)
            if user:
                job_filters.add(Q(tasks__time_entries__user=user), Q.AND)

            job_qs = (
                Job.objects
                .annotate(
                    total_time=Sum(
                        F('tasks__time_entries__ended_at') - F('tasks__time_entries__started_at'),
                        filter=job_filters
                    ),
                    chargeable_time=Sum(
                        F('tasks__time_entries__ended_at') - F('tasks__time_entries__started_at'),
                        filter=job_filters & Q(tasks__not_chargeable=False)
                    )
                )
                .filter(total_time__isnull=False)
                .order_by('-total_time')
            )

            client_filters = Q().add(Q(jobs__tasks__time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
            if client:
                client_filters.add(Q(id=client.id), Q.AND)
            if job:
                client_filters.add(Q(jobs__id=job.pk), Q.AND)
            if user:
                client_filters.add(Q(jobs__tasks__time_entries__user=user), Q.AND)

            client_qs = (
                Client.objects
                .annotate(
                    total_time=Sum(
                        F('jobs__tasks__time_entries__ended_at') - F('jobs__tasks__time_entries__started_at'),
                        filter=client_filters
                    ),
                    chargeable_time=Sum(
                        F('jobs__tasks__time_entries__ended_at') - F('jobs__tasks__time_entries__started_at'),
                        filter=client_filters & Q(jobs__tasks__not_chargeable=False)
                    )
                )
                .filter(total_time__isnull=False)
                .order_by('-total_time')
            )

            time_entry_filters = Q().add(Q(started_at__date__range=(date_from, date_to)), Q.AND)
            if user:
                time_entry_filters.add(Q(user=user), Q.AND)

            time_entry_qs = (
                TimeEntry.objects
                .filter(time_entry_filters)
                .order_by('user', 'started_at')
                .select_related('user')
            )
            return client_qs.prefetch_related(
                Prefetch('jobs', job_qs.prefetch_related(
                    Prefetch('tasks', task_qs.prefetch_related(
                        Prefetch('time_entries', time_entry_qs)
                    ))
                ))
            )
        return Client.objects.none()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'form': self.get_filter_form(),
            'totals': self.get_time_totals(),
            'by_staff': self.get_time_by_staff(),
            'by_client': self.get_time_by_client()
        })
        return context
