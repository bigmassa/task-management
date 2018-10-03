from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets

from wip.models import Client
from wip.serializers import ClientSerializer


class ClientFilter(FilterSet):
    for_clock = filters.BooleanFilter(method='filter_for_clock')

    def filter_for_clock(self, queryset, name, value):
        return queryset.filter(jobs__status__allow_new_clock_entries=value).distinct()


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_class = ClientFilter
