from django import forms
from django.templatetags.static import static


class Checkbox(forms.CheckboxInput):
    template_name = 'wip/widgets/checkbox_input.html'


class DatePicker(forms.widgets.DateInput):
    def __init__(self, attrs=None, format=None):
        if not attrs:
            attrs = {
                'class': 'flatpickr',
                'placeholder': 'dd/mm/yyyy'
            }
        if not format:
            format = '%d/%m/%Y'

        super().__init__(attrs, format)

    class Media:
        css = {
            'all': (
                static('dist/vendor/flatpickr/flatpickr.min.css'),
            )
        }
        js = (
            static('dist/vendor/flatpickr/flatpickr.min.js'),
            static('dist/js/flatpickr.js')
        )
