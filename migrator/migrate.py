from datetime import datetime, timedelta
from decimal import Decimal, InvalidOperation
from io import StringIO
import re

from django.core.exceptions import ValidationError
from django.core.management import call_command
from django.db import connection, transaction

from authentication import models as a_models
from migrator import models as m_models
from wip import models as w_models
from wip.utils import duration_to_decimal_hrs


def format_url(url):
    if url and not url.startswith('http'):
        return 'http://%s' % url
    return url


def load():
    """ from migrator.migrate import load; load() """
    with transaction.atomic():

        print('add users')
        legacy_users = m_models.Staff.objects.using('legacy').all()
        for obj in legacy_users:
            new_user = a_models.User.objects.create(
                id=obj.staffid,
                email='%s@example.com' % obj.staffid,
                first_name=obj.staffname,
                is_active=obj.currentyn
            )
            if obj.currentyn:
                new_user.set_password('password')
                new_user.save()

        reset_sequences()

        print('add clients')
        new_clients = []
        legacy_clients = m_models.Client.objects.using('legacy').all()
        for obj in legacy_clients:
            new_client = w_models.Client(
                id=obj.clientid,
                name=obj.clientname,
                colour='#FFFFFF',
                phone_number=obj.clientphone or '',
                email_address=obj.clientemail or '',
                website=format_url(obj.clientwebsite) or '',
                notes=obj.clientnotes or '',
                address=''
            )
            new_client.full_clean()
            new_clients.append(new_client)

        w_models.Client.objects.bulk_create(new_clients)

        reset_sequences()

        print('add job types')
        job_types = m_models.Jobtype.objects.using('legacy').all().order_by('jobtypetitle')
        for obj in job_types:
            new_job_type = w_models.JobType(
                id=obj.jobtypeid,
                title=obj.jobtypetitle
            )
            new_job_type.full_clean()
            new_job_type.save()

        reset_sequences()

        w_models.JobType.objects.create(
            title='Maintenance'
        )

        print('add job statuses')
        job_statuses = m_models.Jobstatus.objects.using('legacy').all().order_by('jobstatustitle')
        order = 0
        for obj in job_statuses:
            new_job_status = w_models.JobStatus(
                id=obj.jobstatusid,
                title=obj.jobstatustitle,
                allow_new_timesheet_entries=False if obj.jobstatustitle == 'Completed' else True,
                order=order
            )
            new_job_status.full_clean()
            new_job_status.save()

            order += 1

        reset_sequences()

        print('add jobs')
        new_jobs = []
        maintenance_id = w_models.JobType.objects.get(title='Maintenance').pk
        jobs = m_models.Job.objects.using('legacy').all()
        for obj in jobs:
            new_job = w_models.Job(
                id=obj.jobnumber,
                title=obj.jobtitle,
                description=obj.jobdesc,
                client_id=obj.clientid_id,
                type_id=maintenance_id if obj.ismaintenance else obj.jobtype,
                estimated_hours=obj.estimatedtime,
                colour=obj.jobcolour,
                status_id=obj.jobstatusid_id,
                billed_to=obj.billedto.date() if obj.billedto and obj.billedto.year != 5000 else None
            )
            new_job.full_clean()
            new_jobs.append(new_job)

        w_models.Job.objects.bulk_create(new_jobs)

        reset_sequences()

        print('add job related guff')
        manager = w_models.Relationship.objects.create(title='Project Manager')
        lead = w_models.Relationship.objects.create(title='Lead Developer')
        jobs = m_models.Job.objects.using('legacy').all()
        new_relationships = []
        new_notes = []
        for obj in jobs:
            if obj.managerid:
                new_relationship = w_models.JobRelationship(
                    job_id=obj.jobnumber,
                    user_id=obj.managerid,
                    relationship=manager
                )
                new_relationship.full_clean()
                new_relationships.append(new_relationship)

            if obj.jobleadid:
                new_relationship = w_models.JobRelationship(
                    job_id=obj.jobnumber,
                    user_id=obj.jobleadid,
                    relationship=lead
                )
                new_relationship.full_clean()
                new_relationships.append(new_relationship)

            if obj.jobnotes:
                new_note = w_models.JobNote(
                    job_id=obj.jobnumber,
                    user_id=obj.managerid or 12,  # studio
                    note=obj.jobnotes
                )
                new_note.full_clean()
                new_notes.append(new_note)

        w_models.JobRelationship.objects.bulk_create(new_relationships)
        w_models.JobNote.objects.bulk_create(new_notes)

        print('add task statuses')
        task_statuses = m_models.Taskstatus.objects.using('legacy').all().order_by('display_order', 'description')
        order = 0
        for obj in task_statuses:
            new_task_status = w_models.TaskStatus(
                id=obj.id,
                title=obj.description,
                order=order
            )
            new_task_status.full_clean()
            new_task_status.save()

            order += 1

        reset_sequences()

        print('add tasks')
        new_tasks = []
        order = 0
        tasks = m_models.Task.objects.using('legacy').all().select_related('jobid').order_by('display_order', 'title')
        for obj in tasks:
            new_task = w_models.Task(
                id=obj.taskid,
                title=obj.title,
                description=obj.description,
                job_id=obj.jobid.jobnumber,
                status_id=obj.taskstatusid_id,
                target_date=obj.tasktargetdate.date() if obj.tasktargetdate else None,
                closed=obj.is_closed,
                not_chargeable=False,
                order=order
            )
            new_task.full_clean()
            new_tasks.append(new_task)

            order += 1

        w_models.Task.objects.bulk_create(new_tasks)

        reset_sequences()

        print('add task related guff')
        tasks = m_models.Task.objects.using('legacy').all()
        new_assignees = []
        new_notes = []
        for obj in tasks:
            # clean the hrs up as the source is not even a number
            if obj.tasktargethours:
                hrs = None
                try:
                    hrs = Decimal(obj.tasktargethours.strip()).quantize(Decimal('0.01'))
                except (ValidationError, InvalidOperation):
                    print('%s error converting tasktargethours as decimal "%s"' % (obj, obj.tasktargethours))

                if hrs:
                    new_assignee = w_models.TaskAssignee(
                        task_id=obj.taskid,
                        user_id=obj.staffid or 1,
                        allocated_hours=hrs
                    )
                    new_assignee.full_clean()
                    new_assignees.append(new_assignee)

            if obj.notes:
                new_note = w_models.TaskNote(
                    task_id=obj.taskid,
                    user_id=obj.staffid or 12,  # studio
                    note=obj.notes
                )
                new_note.full_clean()
                new_notes.append(new_note)

        w_models.TaskAssignee.objects.bulk_create(new_assignees)
        w_models.TaskNote.objects.bulk_create(new_notes)

        reset_sequences()

        print('add time entries')
        legacy_entries = m_models.Entry.objects.using('legacy').filter(taskid__isnull=False).order_by('entryid')
        new_time_entries = []
        for obj in legacy_entries:
            started_at = datetime.combine(obj.date, obj.started_at)
            ended_at = datetime.combine(obj.date, obj.ended_at)
            new_time_entry = w_models.TimeEntry(
                id=obj.entryid,
                task_id=obj.taskid_id,
                started_at=started_at,
                ended_at=max(ended_at, started_at + timedelta(minutes=1)),
                user_id=obj.staffid_id,
                comments=obj.comment
            )
            new_time_entry.full_clean()
            new_time_entries.append(new_time_entry)

        w_models.TimeEntry.objects.bulk_create(new_time_entries)

        reset_sequences()


def tidyup():
    """ from migrator.migrate import tidyup; tidyup() """

    print('set client colour to first job colour')
    for obj in w_models.Client.objects.all():
        if obj.jobs.count() > 0:
            obj.colour = obj.jobs.first().colour
            obj.save()

    print('add task timings')
    new_timings = []
    for task in w_models.Task.objects.all():
        new_timing = w_models.TaskTiming(
            task=task
        )
        new_timings.append(new_timing)
    w_models.TaskTiming.objects.bulk_create(new_timings)

    print('set timing defaults')
    for timing in w_models.TaskTiming.objects.with_calculated().all():
        timing.allocated_hours = timing.qs_allocated_hours or Decimal('0.00')
        timing.time_spent_hours = duration_to_decimal_hrs(timing.qs_time_spent_hours)
        timing.save()

    print('sign off timesheets')
    w_models.TimeEntry.objects.filter(started_at__date__lt='2018-11-18').update(
        signed_off=True,
        signed_off_date=datetime.today().date()
    )


def reset_sequences():
    """ reset the sql sequences """

    app_names = ['authentication', 'wip']

    for app_name in app_names:
        output = StringIO()
        call_command('sqlsequencereset', app_name, stdout=output)
        sql = output.getvalue()

        # Remove terminal color codes from sqlsequencereset output
        ansi_escape = re.compile(r'\x1b[^m]*m')
        sql = ansi_escape.sub('', sql)

        with connection.cursor() as cursor:
            cursor.execute(sql)

    print('reset_sequences')
