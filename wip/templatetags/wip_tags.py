from decimal import Decimal
from urllib.parse import urlencode

from django import template
from django.conf import settings


register = template.Library()


@register.simple_tag
def is_debug_mode():
    return settings.DEBUG


@register.simple_tag(takes_context=True)
def section_name(context):
    """ Finds the section name for a given url """

    url_name = context['request'].resolver_match.url_name

    if url_name.startswith("taskboard"):
        return 'taskboard'

    if url_name.startswith("timesheet"):
        return 'timesheet'

    if url_name.startswith("report"):
        return 'report'

    if url_name.startswith(("client", "job", "task")):
        return 'client'


@register.simple_tag(takes_context=True)
def url_replace(context, **kwargs):
    """
    will append kwargs to the existing url
    ie:
    assuming the current url is '/home/?foo=bar'
    <a href="?{% url_replace page=1 %}">Next</a>
    rendered html:
    <a href="/home/?foo=bar&page=1">Next</a>
    """
    query = context['request'].GET.dict()
    query.update(kwargs)
    return urlencode(query)


@register.filter
def duration_decimal(value):
    """ Returns a duration as a decimal (1 00:30:00 = 24.5) """

    if value:
        hours, remainder = divmod(value.seconds, 3600)
        hours += (value.days * 24)
        minutes = remainder / 3600
        return Decimal(hours + minutes).quantize(Decimal('0.01'))
