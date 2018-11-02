from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskNote
from wip.serializers import TaskNoteSerializer


class TaskNoteFilter(FilterSet):
    pass


class TaskNoteViewSet(viewsets.ModelViewSet):
    queryset = TaskNote.objects.all()
    serializer_class = TaskNoteSerializer
    filter_class = TaskNoteFilter
