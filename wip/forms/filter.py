from django import forms

from authentication.models import User


class UserModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        """ return name instead of a str of the object """
        return obj.get_full_name


class UserFilterForm(forms.Form):
    user = UserModelChoiceField(
        queryset=User.objects.filter(is_active=True),
    )
