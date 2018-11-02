from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import JobRelationship
from wip.serializers import JobRelationshipSerializer


class JobRelationshipFilter(FilterSet):
    pass


class JobRelationshipViewSet(viewsets.ModelViewSet):
    queryset = JobRelationship.objects.all()
    serializer_class = JobRelationshipSerializer
    filter_class = JobRelationshipFilter
