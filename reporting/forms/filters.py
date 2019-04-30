from dal import autocomplete
from django import forms

from authentication.models import User
from reporting.forms.widgets import DatePicker
from wip.models import Client, Job


class UserModelChoiceField(forms.ModelChoiceField):
    """ a user choice field that replaces the default choice text """
    def label_from_instance(self, obj):
        return obj.get_full_name


class DateFilterForm(forms.Form):
    """ form to include a date range """
    date_from = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',),
        required=False
    )
    date_to = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',),
        required=False
    )


class JobFilterForm(forms.Form):
    """ form to include a cascading client > job autocomplete """
    client = forms.ModelChoiceField(
        queryset=Client.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-client')
    )
    job = forms.ModelChoiceField(
        queryset=Job.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-job', forward=['client'])
    )

    def get_jobs(self):
        if 'client' in self.data:
            try:
                client_id = int(self.data.get('client'))
                return Job.objects.filter(client_id=client_id).order_by('title')
            except (ValueError, TypeError):
                pass

        return Job.objects.none()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['job'].queryset = self.get_jobs()


class JobTimeAnalysisFilterForm(JobFilterForm, DateFilterForm):
    pass


class TimesheetAnalysisFilterForm(JobFilterForm, DateFilterForm):
    client = forms.ModelChoiceField(
        queryset=Client.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-client'),
        required=False
    )
    job = forms.ModelChoiceField(
        queryset=Job.objects.all(),
        widget=autocomplete.ModelSelect2('reporting:autocomplete-job', forward=['client']),
        required=False
    )
    user = UserModelChoiceField(
        queryset=User.objects.filter(is_active=True),
        required=False,
        empty_label='-- All --'
    )
