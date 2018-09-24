from django import forms

from wip.forms.formset import InlineFormSet
from wip.forms.widgets import DatePicker
from wip.models import Job, JobRecurringCost


class JobRecurringCostForm(forms.ModelForm):
    last_invoiced_date = forms.DateField(
        widget=DatePicker,
        input_formats=('%d/%m/%Y',),
        required=False
    )

    class Meta:
        exclude = ['job']
        model = JobRecurringCost


JobRecurringCostFormSet = forms.inlineformset_factory(
    Job,
    JobRecurringCost,
    form=JobRecurringCostForm,
    formset=InlineFormSet,
    extra=0
)
