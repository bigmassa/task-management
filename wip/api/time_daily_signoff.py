from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import TimeDailySignoff
from wip.serializers import TimeDailySignoffSerializer


class TimeDailySignoffFilter(FilterSet):
    date_from = filters.DateFilter(field_name='date', lookup_expr='gte')


class TimeDailySignoffViewSet(viewsets.ModelViewSet):
    queryset = TimeDailySignoff.objects.all()
    serializer_class = TimeDailySignoffSerializer
    filter_class = TimeDailySignoffFilter
