from app.bindings import BaseModelBinding
from wip.serializers import ClientContactSerializer
from wip.models import ClientContact


class ClientContactBinding(BaseModelBinding):
    model = ClientContact
    serializer = ClientContactSerializer
