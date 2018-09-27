from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView, UpdateView, DeleteView

from wip.forms.client_contact import ClientContactForm
from wip.models import Client, ClientContact
from wip.views.mixins import ProtectedDeleteMixin, DeleteMessageMixin


class ClientContactCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    form_class = ClientContactForm
    model = ClientContact
    success_message = "Created successfully"
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


class ClientContactDelete(LoginRequiredMixin, ProtectedDeleteMixin, DeleteMessageMixin, DeleteView):
    model = ClientContact

    def get_success_url(self):
        return self.object.client.get_absolute_url()


class ClientContactUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    form_class = ClientContactForm
    model = ClientContact
    success_message = "Updated successfully"
    template_name = 'wip/clientcontact_update.html'

    def get_success_url(self):
        return self.object.client.get_absolute_url()
