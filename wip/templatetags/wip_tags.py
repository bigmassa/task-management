from decimal import Decimal

from django import template
from django.conf import settings


register = template.Library()


@register.simple_tag
def is_debug_mode():
    return settings.DEBUG


@register.filter
def duration_decimal(value):
    """ Returns a duration as a decimal (1 00:30:00 = 24.5) """

    if value:
        hours, remainder = divmod(value.seconds, 3600)
        hours += (value.days * 24)
        minutes = remainder / 3600
        return Decimal(hours + minutes).quantize(Decimal('0.01'))
