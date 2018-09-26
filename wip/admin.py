from django.contrib import admin

from wip.models import *


admin.site.register(Client)
admin.site.register(ClientContact)
admin.site.register(Job)
admin.site.register(JobFile)
admin.site.register(JobNote)
admin.site.register(JobRecurringCost)
admin.site.register(JobRelationship)
admin.site.register(JobStatus)
admin.site.register(JobType)
admin.site.register(PaymentOption)
admin.site.register(Position)
admin.site.register(RecurringCostType)
admin.site.register(Relationship)
admin.site.register(Task)
admin.site.register(TaskAssignee)
admin.site.register(TaskNote)
admin.site.register(TaskStatus)
admin.site.register(TimeDailySignoff)
admin.site.register(TimeEntry)
