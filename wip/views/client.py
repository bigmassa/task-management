import operator
from functools import partial, reduce

from dal import autocomplete
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import Prefetch
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView

from wip.models import Client, Job
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


AND = partial(reduce, operator.and_)


class ClientCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    fields = '__all__'
    model = Client
    success_message = "Created successfully"
    success_url = reverse_lazy('wip:client-list')
    template_name = 'wip/client_add.html'


class ClientDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = Client
    success_url = reverse_lazy('wip:client-list')


class ClientDetail(LoginRequiredMixin, DetailView):
    model = Client

    def get_queryset(self):
        return (
            super().get_queryset()
            .prefetch_related(
                'contacts__position',
                Prefetch(
                    'jobs',
                    Job.objects.select_related('status')
                )
            )
        )


class ClientList(LoginRequiredMixin, ListView):
    model = Client

    def get_search_kwargs(self):
        return self.request.GET.get('search', '').split()

    @staticmethod
    def get_search_vector():
        return (
            SearchVector('name', weight='A') +
            SearchVector('phone_number', weight='B') +
            SearchVector('email_address', weight='B') +
            SearchVector('website', weight='B') +
            SearchVector('address', weight='B')
        )

    def get_search_query(self):
        search_terms = self.get_search_kwargs()
        if not search_terms:
            return SearchQuery('')
        return AND(SearchQuery(q) for q in search_terms)

    def get_queryset(self):
        queryset = super().get_queryset()
        vector = self.get_search_vector()
        query = self.get_search_query()
        return (
            queryset
            .annotate(search=vector, rank=SearchRank(vector, query))
            .filter(search=query)
            .order_by('-rank')
        )

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context.update({
            'search': self.request.GET.get('search', '')
        })
        return context


class ClientUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    fields = '__all__'
    model = Client
    success_message = "Updated successfully"
    template_name = 'wip/client_update.html'


class ClientAutocomplete(autocomplete.Select2QuerySetView):
    model = Client
    paginate_by = 50

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return self.model.objects.none()

        qs = self.model.objects.all()

        if self.q:
            qs = qs.filter(**{'name__istartswith': self.q})

        return qs

    def has_add_permission(self, request):
        if not request.user.is_authenticated:
            return False
        return False
