from django import forms
from django.templatetags.static import static


class DatePicker(forms.widgets.DateInput):
    template_name = 'reporting/widgets/date.html'

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
            static('dist/vendor/jquery/jquery.min.js'),
            static('dist/vendor/flatpickr/flatpickr.min.js'),
            static('dist/js/flatpickr.min.js')
        )
