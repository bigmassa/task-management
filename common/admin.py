from django.contrib import admin

from .models import WIPSettings


class WIPSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Notification settings', {'fields': ('slack_authentication_token', 'timesheet_check_range', )}),
    )


admin.site.register(WIPSettings, WIPSettingsAdmin)
