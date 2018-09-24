from datetime import date

from django.urls import reverse

from tests.test_case import AppTestCase
from wip.models import Job, JobRecurringCost, RecurringCostType, PaymentOption


class TestView(AppTestCase):
    fixtures = ['wip/tests/fixtures/test.yaml']

    def setUp(self):
        self.object = Job.objects.first()
        self.url = reverse('wip:jobrecurringcost-update', kwargs={'pk': self.object.pk})
        self.user = self.create_user()

    def test_login_required(self):
        response = self.client.get(self.url)
        expected_url = '{}?next={}'.format(reverse('login'), self.url)
        self.assertRedirects(response, expected_url, 302, 200)

    def test_logged_in_grants_access(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_can_update(self):
        self.client.force_login(self.user)
        cost_type = RecurringCostType.objects.first()
        payment_option = PaymentOption.objects.first()
        data = {
            'recurring_costs-TOTAL_FORMS': '1',
            'recurring_costs-INITIAL_FORMS': '1',
            'recurring_costs-MIN_NUM_FORMS': '0',
            'recurring_costs-MAX_NUM_FORMS': '10',
            'recurring_costs-0-id': 1,
            'recurring_costs-0-job': self.object.pk,
            'recurring_costs-0-type': cost_type.pk,
            'recurring_costs-0-last_invoiced_date': '12/01/2018',
            'recurring_costs-0-billing_interval': 1,
            'recurring_costs-0-billing_frequency': 0,
            'recurring_costs-0-payment_option': payment_option.pk
        }
        response = self.client.post(self.url, data)

        # test exists
        JobRecurringCost.objects.get(
            pk=1,
            job=self.object,
            type=cost_type,
            last_invoiced_date=date(2018, 1, 12),
            billing_interval=1,
            billing_frequency=0,
            payment_option=payment_option
        )

        # test redirected after
        self.assertRedirects(response, self.object.get_absolute_url(), 302, 200)
