from app.bindings import BaseModelBinding
from wip.serializers import JobRecurringCostSerializer
from wip.models import JobRecurringCost


class JobRecurringCostBinding(BaseModelBinding):
    model = JobRecurringCost
    serializer = JobRecurringCostSerializer
