from dal import autocomplete
from django import forms

from wip.models import ClientContact


class ClientContactForm(forms.ModelForm):

    class Meta:
        exclude = ['client']
        model = ClientContact
        widgets = {
            'tags': autocomplete.TaggitSelect2('wip:tag-autocomplete')
        }
