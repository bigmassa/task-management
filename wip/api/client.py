from django_filters import FilterSet
from rest_framework import viewsets

from wip.models import Client
from wip.serializers import ClientSerializer


class ClientFilter(FilterSet):
    pass


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_class = ClientFilter
