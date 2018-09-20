from django.db import models

from authentication.models import User
from tests.test_case import AppTestCase
from wip.models import Job, JobRelationship, Relationship


class ModelTests(AppTestCase):

    # fields

    def test_job(self):
        field = JobRelationship._meta.get_field('job')
        self.assertModelPKField(field, Job, on_delete=models.CASCADE, related_name='relationships')

    def test_user(self):
        field = JobRelationship._meta.get_field('user')
        self.assertModelPKField(field, User, on_delete=models.CASCADE)

    def test_relationship(self):
        field = JobRelationship._meta.get_field('relationship')
        self.assertModelPKField(field, Relationship, on_delete=models.PROTECT)
