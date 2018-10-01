from rest_framework import serializers

from wip.models import Client


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = [
            'id',
            'name',
            'colour',
            'phone_number',
            'email_address',
            'website',
            'address',
            'notes'
        ]
