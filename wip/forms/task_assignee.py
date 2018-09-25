from django import forms

from wip.forms.formset import InlineFormSet
from wip.models import Task, TaskAssignee


class TaskAssigneeForm(forms.ModelForm):

    class Meta:
        exclude = ['task']
        model = TaskAssignee


TaskAssigneeFormSet = forms.inlineformset_factory(
    Task,
    TaskAssignee,
    form=TaskAssigneeForm,
    formset=InlineFormSet,
    extra=0
)
