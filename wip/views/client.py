import operator
from functools import partial, reduce

from dal import autocomplete
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
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

    def get_queryset(self):
        queryset = super().get_queryset()
        query_args = self.get_search_kwargs()
        return queryset.search(query_args=query_args)

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
            qs = qs.filter(name__icontains=self.q)

        return qs

    def has_add_permission(self, request):
        return False
