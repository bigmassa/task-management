from django.contrib import admin

from reversion.admin import VersionAdmin

from wip.models import *


admin.site.register(Client, VersionAdmin)
admin.site.register(ClientContact, VersionAdmin)
admin.site.register(Job, VersionAdmin)
admin.site.register(JobFile, VersionAdmin)
admin.site.register(JobNote, VersionAdmin)
admin.site.register(JobRecurringCost, VersionAdmin)
admin.site.register(JobRelationship, VersionAdmin)
admin.site.register(JobStatus, VersionAdmin)
admin.site.register(JobTiming, VersionAdmin)
admin.site.register(JobType, VersionAdmin)
admin.site.register(PaymentOption, VersionAdmin)
admin.site.register(Position, VersionAdmin)
admin.site.register(RecurringCostType, VersionAdmin)
admin.site.register(Relationship, VersionAdmin)
admin.site.register(Task, VersionAdmin)
admin.site.register(TaskAssignee, VersionAdmin)
admin.site.register(TaskFile, VersionAdmin)
admin.site.register(TaskNote, VersionAdmin)
admin.site.register(TaskStatus, VersionAdmin)
admin.site.register(TaskTiming, VersionAdmin)
admin.site.register(TimeEntry, VersionAdmin)
