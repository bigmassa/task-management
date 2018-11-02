from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import JobNote
from wip.serializers import JobNoteSerializer


class JobNoteFilter(FilterSet):
    pass


class JobNoteViewSet(viewsets.ModelViewSet):
    queryset = JobNote.objects.all()
    serializer_class = JobNoteSerializer
    filter_class = JobNoteFilter
