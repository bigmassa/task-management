from django import template


register = template.Library()


@register.filter
def divide(value, divisible):
    if value and divisible:
        return value / divisible
    return 0


@register.filter
def multiply(value, arg):
    return value * arg
