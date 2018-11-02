from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import JobRecurringCost
from wip.serializers import JobRecurringCostSerializer


class JobRecurringCostFilter(FilterSet):
    pass


class JobRecurringCostViewSet(viewsets.ModelViewSet):
    queryset = JobRecurringCost.objects.all()
    serializer_class = JobRecurringCostSerializer
    filter_class = JobRecurringCostFilter
