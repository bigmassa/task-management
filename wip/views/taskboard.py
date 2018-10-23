from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Sum
from django.views.generic import TemplateView

from wip.forms.filter import UserFilterForm
from wip.models import Task, TaskAssignee


class TaskBoard(LoginRequiredMixin, TemplateView):
    template_name = 'wip/taskboard.html'

    def get_filter_form(self):
        if 'user' in self.request.GET:
            return UserFilterForm(self.request.GET)
        return UserFilterForm({'user': self.request.user})

    def get_user(self):
        form = self.get_filter_form()
        if form.is_valid():
            return form.cleaned_data['user']
        return self.request.user

    def get_tasks(self, with_extra=False):
        tasks = Task.objects.open().filter(assignees__user=self.get_user())
        if with_extra:
            tasks = tasks.order_by('target_date', 'order')
            tasks = tasks.select_related('job__client', 'status').prefetch_related('assignees__user')
        return tasks

    def get_allocated_hours(self):
        return (
            TaskAssignee.objects
            .filter(task__in=self.get_tasks(), user=self.get_user())
            .aggregate(Sum('allocated_hours'))
        )['allocated_hours__sum']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tasks = self.get_tasks(with_extra=True)
        context.update({
            'form': self.get_filter_form(),
            'tasks': tasks,
            'count': len(tasks),
            'overdue': sum(int(1) for task in tasks if task.is_overdue),
            'allocated_hours': self.get_allocated_hours()
        })
        return context
