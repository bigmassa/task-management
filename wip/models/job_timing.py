from django.db import models
from django.db.models.manager import BaseManager


class JobTimingQueryset(models.QuerySet):
    """ Custom queryset """

    def with_calculated(self):
        """ Add caclulations to the queryset """

        return self.annotate(
            qs_allocated_hours=models.Sum('job__tasks__timing__allocated_hours'),
            qs_time_spent_hours=models.Sum('job__tasks__timing__time_spent_hours')
        )


class JobTimingManager(BaseManager.from_queryset(JobTimingQueryset)):
    """ Custom manager from queryset """

    pass


class JobTiming(models.Model):
    job = models.OneToOneField(
        'wip.Job',
        on_delete=models.CASCADE,
        related_name='timing'
    )
    allocated_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        default='0.00',
        editable=False
    )
    time_spent_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        default='0.00',
        editable=False
    )

    objects = JobTimingManager()

    @property
    def is_over_allocated_hours(self):
        if self.time_spent_hours and self.allocated_hours:
            return self.time_spent_hours > self.allocated_hours
        return False
