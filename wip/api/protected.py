from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from wip.utils import get_protected_related


class ProtectedViewSet(ViewSet):
    """
    Gets a list of entities that are preventing an entity from being deleted
    via a ForeignKey(on_delete=PROTECT).
    """

    def list(self, request, format=None):
        """
        Example usage: ?app_label=wip&model_name=task&pk=1
        """
        query_params = self.request.query_params
        app_label = query_params.get('app_label')
        model_name = query_params.get('model_name')
        pk = query_params.get('pk')

        if not app_label or not model_name or not pk:
            return Response([])

        try:
            model_class = apps.get_model(app_label=app_label, model_name=model_name)
            instance = model_class.objects.get(pk=pk)
            protected = get_protected_related(instance)
            return Response(protected)

        except (LookupError, ObjectDoesNotExist):
            return Response([])
