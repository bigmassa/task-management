from dal import autocomplete
from django import forms

from authentication.models import User
from reporting.forms.widgets import DatePicker
from wip.models import Client, Job


class DateFilterForm(forms.Form):
    date_from = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',)
    )
    date_to = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',)
    )


class JobModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.full_title


class UserModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.get_full_name


class JobDateFilterForm(DateFilterForm):
    client = forms.ModelChoiceField(
        queryset=Client.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-client')
    )
    job = JobModelChoiceField(
        queryset=Job.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-job', forward=['client'])
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if 'client' in self.data:
            try:
                client_id = int(self.data.get('client'))
                self.fields['job'].queryset = Job.objects.filter(client_id=client_id).order_by('title')
            except (ValueError, TypeError):
                pass

    def get_job(self):
        try:
            return Job.objects.get(id=self.data.get('job'))
        except Job.DoesNotExist:
            return None


class UserDateFilterForm(DateFilterForm):
    user = UserModelChoiceField(
        queryset=User.objects.filter(is_active=True),
        required=False,
        empty_label='-- All --'
    )
