from django.db import models

from dateutil.rrule import (
    DAILY,
    MONTHLY,
    WEEKLY,
    YEARLY
)


class JobRecurringCost(models.Model):
    job = models.ForeignKey(
        'wip.Job',
        on_delete=models.CASCADE,
        related_name='recurring_costs'
    )
    type = models.ForeignKey(
        'wip.RecurringCostType',
        on_delete=models.PROTECT
    )
    last_invoiced_date = models.DateField(
        null=True,
        blank=True
    )
    billing_interval = models.PositiveIntegerField()
    billing_frequency = models.IntegerField(
        choices=(
            (DAILY, 'Day(s)'),
            (WEEKLY, 'Week(s)'),
            (MONTHLY, 'Month(s)'),
            (YEARLY, 'Year(s)'),
        )
    )
    payment_option = models.ForeignKey(
        'wip.PaymentOption',
        on_delete=models.PROTECT
    )

    class Meta:
        ordering = ['type']

    @property
    def billing_frequency_text(self):
        """ returns a friendly string describing the billing frequency """

        return 'Every {} {}'.format(
            self.billing_interval,
            self.get_billing_frequency_display()
        )
