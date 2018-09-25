from decimal import Decimal


def seconds_to_decimal_hrs(seconds):
    """ Convert seconds to hrs decimal, ie 1800 = Decimal('0.50') """

    if seconds > 0:
        hrs = seconds / 3600
    else:
        hrs = 0

    return Decimal(hrs).quantize(Decimal('0.01'))
