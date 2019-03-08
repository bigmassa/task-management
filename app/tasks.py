from datetime import datetime

from django.core.mail import EmailMessage
from django.db import models

from huey import crontab
from huey.contrib.djhuey import db_task, task
import requests

from common.models import WIPSettings


HOST = 'https://wip.accentdesign.co.uk'


class SlackNotification:
    def __init__(self, task):
        self.task = task

    def json(self):
        client_name = self.task.job.client.name
        job_title = self.task.job.title

        client_link = f'{HOST}/clients/{self.task.job.client_id}'
        job_link = f'{HOST}/clients/{self.task.job.client_id}/jobs/{self.task.job_id}'
        title_link = f'{job_link}?task={self.task.id}'
        footer = f'<{client_link}|{client_name}> - <{job_link}|{job_title}>'

        return {
            "channel": self.task.job.slack_channel_id,
            "attachments": [
                {
                    "fallback": f'Task updated: {self.task.title}',
                    "color": self.task.job.client.colour,
                    "pretext": "Task updated",
                    "title": self.task.title,
                    "title_link": title_link,
                    "text": self.task.description,
                    "fields": [
                        {
                            "title": "Status",
                            "value": str(self.task.status),
                            "short": False
                        }
                    ],
                    "footer": footer,
                    "ts": datetime.now().timestamp()
                }
            ]
        }


@db_task()
def notify_status_change(task, to=None):
    """
    Broadcast task status changes.
    The task status should be set to notify.
    An email can be passed in the override where its being sent to.
    """

    notify_job_relationships = task.status.notify_job_relationships
    notify_task_assignees = task.status.notify_task_assignees

    print(notify_job_relationships, notify_task_assignees)

    # if the task doesnt notify anyone quit early
    if not any([notify_job_relationships, notify_task_assignees]):
        return

    if task.job.slack_channel_id:
        send_slack_notification(task)

    send_email(task, to, None, notify_job_relationships, notify_task_assignees)


@task(retries=3, retry_delay=60)
def send_email(task, to, reply_to, notify_relationships, notify_assignees):
    """ Send an email. """

    # setup the email content
    subject = f'WIP - Task "{task.status}" for "{task.job}"'
    url = f'{HOST}/clients/{task.job.client_id}/jobs/{task.job_id}?task={task.id}'
    body = f'Task "{task.status}" for "{task.job}".\n\n{task.title}\n\n{url}'

    to_addresses = []
    if to:
        to_addresses.append(to)

    # if to_addresses was not set find out who wants the email
    if not to_addresses:
        if notify_relationships:
            to_addresses += [r.user.email for r in task.job.relationships.filter(user__is_active=True)]
        if notify_assignees:
            to_addresses += [r.user.email for r in task.assignees.filter(user__is_active=True)]

    # make the to addresses unique
    to_addresses = list(set(to_addresses))

    email = EmailMessage(subject=subject, body=body, to=to_addresses, reply_to=reply_to)
    email.send()


@task(retries=3, retry_delay=60)
def send_slack_notification(task):
    """ Send a Slack notification. """

    settings = WIPSettings.load()

    requests.post(
        f'https://slack.com/api/chat.postMessage',
        json=SlackNotification(task).json(),
        headers={'Authorization': f'Bearer {settings.slack_authentication_token}'})
