from decimal import Decimal


def duration_to_decimal_hrs(duration):
    """ Convert a duration to hrs decimal, ie 1 12:00:00 = Decimal('1.50') """

    if not duration:
        return Decimal('0.00')

    hours, remainder = divmod(duration.seconds, 3600)
    hours += (duration.days * 24)
    minutes = remainder / 3600

    return Decimal(hours + minutes).quantize(Decimal('0.01'))
