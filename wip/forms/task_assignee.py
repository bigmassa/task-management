from django import forms

from authentication.models import User
from wip.forms.formset import InlineFormSet
from wip.models import Task, TaskAssignee


class TaskAssigneeForm(forms.ModelForm):
    user = forms.ModelChoiceField(
        queryset=User.objects.filter(is_active=True)
    )

    class Meta:
        model = TaskAssignee
        fields = [
            'id',
            'user',
            'allocated_hours'
        ]


TaskAssigneeFormSet = forms.inlineformset_factory(
    Task,
    TaskAssignee,
    form=TaskAssigneeForm,
    formset=InlineFormSet,
    extra=0
)
