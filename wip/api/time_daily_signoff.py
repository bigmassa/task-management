from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from authentication.models import User
from wip.models import TimeDailySignoff
from wip.serializers import TimeDailySignoffSerializer


class TimeDailySignoffFilter(FilterSet):
    date = filters.DateFromToRangeFilter()
    user = filters.ModelChoiceFilter(queryset=User.objects.all())


class TimeDailySignoffViewSet(viewsets.ModelViewSet):
    queryset = TimeDailySignoff.objects.all()
    serializer_class = TimeDailySignoffSerializer
    filter_class = TimeDailySignoffFilter
