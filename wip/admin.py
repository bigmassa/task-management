from django.contrib import admin

from wip.models import *


admin.site.register(Client)


class JobRelationshipAdmin(admin.TabularInline):
    model = JobRelationship
    extra = 0
    verbose_name = 'relationship'
    verbose_name_plural = 'relationships'


class JobNoteAdmin(admin.StackedInline):
    model = JobNote
    extra = 0
    readonly_fields = ('user', 'created_at', 'updated_at')
    verbose_name = 'note'
    verbose_name_plural = 'notes'


class JobAdmin(admin.ModelAdmin):
    inlines = [JobRelationshipAdmin, JobNoteAdmin]


admin.site.register(Job, JobAdmin)
admin.site.register(JobStatus)
admin.site.register(JobType)
admin.site.register(Relationship)


class TaskAssigneeAdmin(admin.TabularInline):
    model = TaskAssignee
    extra = 0
    verbose_name = 'assignee'
    verbose_name_plural = 'assignees'


class TaskNoteAdmin(admin.StackedInline):
    model = TaskNote
    extra = 0
    readonly_fields = ('user', 'created_at', 'updated_at')
    verbose_name = 'note'
    verbose_name_plural = 'notes'


class TaskAdmin(admin.ModelAdmin):
    inlines = [TaskAssigneeAdmin, TaskNoteAdmin]


admin.site.register(Task, TaskAdmin)
admin.site.register(TaskStatus)
admin.site.register(TimeDailySignoff)
admin.site.register(TimeEntry)
