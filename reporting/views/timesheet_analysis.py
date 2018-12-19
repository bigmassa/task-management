from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Q, Prefetch, Sum
from django.views.generic import TemplateView

from authentication.models import User
from reporting.forms import UserDateFilterForm
from wip.models import Client, Job, Task, TimeEntry


class TimesheetAnalysis(LoginRequiredMixin, TemplateView):
    template_name = 'reporting/timesheet_analysis.html'

    def get_filter_form(self):
        if 'date_from' in self.request.GET:
            return UserDateFilterForm(self.request.GET)
        return UserDateFilterForm()

    def get_time_totals(self):
        """ Get time by staff for the allocated period """

        form = self.get_filter_form()

        if form.is_valid():
            date_from = form.cleaned_data['date_from']
            date_to = form.cleaned_data['date_to']
            user = form.cleaned_data.get('user')

            filters = Q().add(Q(started_at__date__range=(date_from, date_to)), Q.AND)
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
            date_from = form.cleaned_data['date_from']
            date_to = form.cleaned_data['date_to']
            user = form.cleaned_data.get('user')

            filters = Q().add(Q(time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
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
            date_from = form.cleaned_data['date_from']
            date_to = form.cleaned_data['date_to']
            user = form.cleaned_data.get('user')

            task_filters = Q().add(Q(time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
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
                .order_by('title')
            )

            job_filters = Q().add(Q(tasks__time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
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
                .order_by('title')
            )

            client_filters = Q().add(Q(jobs__tasks__time_entries__started_at__date__range=(date_from, date_to)), Q.AND)
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
                .order_by('name')
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
