from app.bindings import BaseModelBinding
from wip.serializers import ClientSerializer
from wip.models import Client


class ClientBinding(BaseModelBinding):
    model = Client
    serializer = ClientSerializer
