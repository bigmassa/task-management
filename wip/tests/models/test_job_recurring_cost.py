from django.db import models
from dateutil.rrule import (
    DAILY,
    MONTHLY,
    WEEKLY,
    YEARLY
)

from tests.test_case import AppTestCase
from wip.models import Job, JobRecurringCost, RecurringCostType, PaymentOption


class ModelTests(AppTestCase):

    # fields

    def test_job(self):
        field = JobRecurringCost._meta.get_field('job')
        self.assertModelPKField(field, Job, on_delete=models.CASCADE, related_name='recurring_costs')

    def test_type(self):
        field = JobRecurringCost._meta.get_field('type')
        self.assertModelPKField(field, RecurringCostType, on_delete=models.PROTECT)

    def test_last_invoiced_date(self):
        field = JobRecurringCost._meta.get_field('last_invoiced_date')
        self.assertModelField(field, models.DateField, null=True, blank=True)

    def test_billing_interval(self):
        field = JobRecurringCost._meta.get_field('billing_interval')
        self.assertModelField(field, models.PositiveIntegerField)

    def test_billing_frequency(self):
        field = JobRecurringCost._meta.get_field('billing_frequency')
        self.assertModelField(field, models.IntegerField)
        self.assertEqual(
            field.choices,
            (
                (DAILY, 'Day(s)'),
                (WEEKLY, 'Week(s)'),
                (MONTHLY, 'Month(s)'),
                (YEARLY, 'Year(s)'),
            )
        )

    def test_payment_option(self):
        field = JobRecurringCost._meta.get_field('payment_option')
        self.assertModelPKField(field, PaymentOption, on_delete=models.PROTECT)

    # meta

    def test_ordering(self):
        self.assertEqual(JobRecurringCost._meta.ordering, ['type'])

    # properties

    def test_billing_frequency_text(self):
        cost = JobRecurringCost(billing_interval=5, billing_frequency=MONTHLY)
        self.assertEqual(cost.billing_frequency_text, 'Every 5 Month(s)')

        cost = JobRecurringCost(billing_interval=1, billing_frequency=YEARLY)
        self.assertEqual(cost.billing_frequency_text, 'Every 1 Year(s)')
