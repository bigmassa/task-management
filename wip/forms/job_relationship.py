from django import forms

from authentication.models import User
from wip.forms.formset import InlineFormSet
from wip.models import Job, JobRelationship


class JobRelationshipForm(forms.ModelForm):
    user = forms.ModelChoiceField(
        queryset=User.objects.filter(is_active=True)
    )

    class Meta:
        model = JobRelationship
        fields = [
            'user',
            'relationship'
        ]


JobRelationshipFormSet = forms.inlineformset_factory(
    Job,
    JobRelationship,
    form=JobRelationshipForm,
    formset=InlineFormSet,
    extra=0
)
