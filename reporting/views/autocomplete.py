from dal import autocomplete

from django.db.models import Q
from wip.models import Client, Job


class AutoCompleteClient(autocomplete.Select2QuerySetView):
    model = Client
    paginate_by = 50

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return self.model.objects.none()

        qs = self.model.objects.all()

        if self.q:
            qs = qs.filter(name__icontains=self.q)

        return qs

    def has_add_permission(self, request):
        return False


class AutoCompleteJob(autocomplete.Select2QuerySetView):
    model = Job
    paginate_by = 50

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return self.model.objects.none()

        qs = self.model.objects.all()

        client = self.forwarded.get('client', None)

        if client:
            qs = qs.filter(client_id=client)
        else:
            qs = self.model.objects.none()

        if self.q:
            qs = qs.filter(Q(pk__icontains=self.q) | Q(title__icontains=self.q))

        return qs

    def get_result_label(self, item):
        return item.full_title

    def get_selected_result_label(self, item):
        return item.full_title

    def has_add_permission(self, request):
        return False
