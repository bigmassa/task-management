from dal import autocomplete
from taggit.models import Tag


class TagsAutocomplete(autocomplete.Select2QuerySetView):
    model = Tag
    paginate_by = 50

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return self.model.objects.none()

        qs = self.model.objects.all()

        if self.q:
            qs = qs.filter(**{'name__istartswith': self.q})

        return qs

    def has_add_permission(self, request):
        return False
