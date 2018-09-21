from django import forms

from wip.forms.widgets import DatePicker
from wip.models import Job


class JobForm(forms.ModelForm):
    billed_to = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',),
        required=False
    )

    class Meta:
        exclude = ['client']
        model = Job
