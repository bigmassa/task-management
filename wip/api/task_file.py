from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TaskFile
from wip.serializers import TaskFileSerializer


class TaskFileFilter(FilterSet):
    pass


class TaskFileViewSet(viewsets.ModelViewSet):
    queryset = TaskFile.objects.all()
    serializer_class = TaskFileSerializer
    filter_class = TaskFileFilter
