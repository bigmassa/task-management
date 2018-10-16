from django import forms

from wip.forms.widgets import DatePicker
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


class JobAnalysisFilterForm(DateFilterForm):
    client = forms.ModelChoiceField(
        queryset=Client.objects.all()
    )
    job = forms.ModelChoiceField(
        queryset=Job.objects.none()
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
