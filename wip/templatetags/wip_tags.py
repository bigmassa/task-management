from django import template


register = template.Library()


@register.simple_tag(takes_context=True)
def section_name(context):
    """ Finds the section name for a given url """

    url_name = context['request'].resolver_match.url_name

    if url_name.startswith("task-board"):
        return 'taskboard'

    if url_name.startswith("timesheet"):
        return 'timesheet'

    if url_name.startswith(("client", "job", "task")):
        return 'client'
