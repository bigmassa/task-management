from django import forms

from wip.forms.widgets import DatePicker, Checkbox
from wip.models import Task


class TaskForm(forms.ModelForm):
    target_date = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',),
        required=False
    )

    class Meta:
        exclude = ['job']
        model = Task
        widgets = {
            'closed': Checkbox
        }