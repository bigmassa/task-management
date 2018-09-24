from django import forms

from wip.forms.formset import InlineFormSet
from wip.models import Job, JobRelationship


class JobRelationshipForm(forms.ModelForm):

    class Meta:
        exclude = ['job']
        model = JobRelationship


JobRelationshipFormSet = forms.inlineformset_factory(
    Job,
    JobRelationship,
    form=JobRelationshipForm,
    formset=InlineFormSet,
    extra=0
)
