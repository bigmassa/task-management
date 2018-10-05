from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class TaskBoard(LoginRequiredMixin, TemplateView):
    template_name = 'wip/task_board.html'
