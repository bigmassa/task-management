from django import forms
from django.templatetags.static import static


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
                'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
            )
        }
        js = (
            'https://cdn.jsdelivr.net/npm/flatpickr',
            static('dist/js/flatpickr.js')
        )
