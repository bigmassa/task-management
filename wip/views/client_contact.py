from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView, UpdateView, DeleteView

from wip.forms.client_contact import ClientContactForm
from wip.models import Client, ClientContact
from wip.views.mixins import ProtectedDeleteMixin


class ClientContactCreate(LoginRequiredMixin, CreateView):
    form_class = ClientContactForm
    model = ClientContact
    template_name = 'wip/clientcontact_add.html'

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        client = get_object_or_404(Client, pk=self.kwargs['pk'])
        kwargs.update({
            'instance': ClientContact(client=client)
        })
        return kwargs

    def get_success_url(self):
        return self.object.client.get_absolute_url()


class ClientContactDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteView):
    model = ClientContact

    def get_success_url(self):
        return self.object.client.get_absolute_url()


class ClientContactUpdate(LoginRequiredMixin, UpdateView):
    form_class = ClientContactForm
    model = ClientContact
    template_name = 'wip/clientcontact_update.html'

    def get_success_url(self):
        return self.object.client.get_absolute_url()
