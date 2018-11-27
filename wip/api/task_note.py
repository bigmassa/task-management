from django.db.models import Q

from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskNote
from wip.serializers import TaskNoteSerializer


class TaskNoteFilter(FilterSet):
    live_at_date = filters.DateTimeFilter(method='live_at_filter')

    def live_at_filter(self, queryset, name, value):
        return queryset.filter(Q(task__closed=True, task__closed_date__gte=value) | Q(task__closed=False))


class TaskNoteViewSet(viewsets.ModelViewSet):
    queryset = TaskNote.objects.all()
    serializer_class = TaskNoteSerializer
    filter_class = TaskNoteFilter
