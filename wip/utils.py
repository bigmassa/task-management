from decimal import Decimal

from django.contrib.admin.utils import NestedObjects
from django.db import router


def duration_to_decimal_hrs(duration):
    """ Convert a duration to hrs decimal, ie 1 12:00:00 = Decimal('1.50') """

    if not duration:
        return Decimal('0.00')

    hours, remainder = divmod(duration.seconds, 3600)
    hours += (duration.days * 24)
    minutes = remainder / 3600

    return Decimal(hours + minutes).quantize(Decimal('0.01'))


def get_protected_related(entity):
    """ Return a list of objects that prevent this entity from being deleted """

    using = router.db_for_write(entity)
    collector = NestedObjects(using=using)
    collector.collect([entity])

    def callable_func(obj):
        data = {
            'pk': obj.pk,
            'verbose_name': obj._meta.verbose_name,
            'verbose_name_plural': str(obj._meta.verbose_name_plural)
        }
        return data

    return [callable_func(o) for o in collector.protected]
