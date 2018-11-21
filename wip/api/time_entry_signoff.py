import coreapi
import coreschema

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema

from wip.models import TimeEntry
from wip.serializers import TimeEntrySerializer, TimeEntrySignoffSerializer


class TimeEntrySignoffViewSet(viewsets.ViewSet):
    schema = ManualSchema(
        fields=[
            coreapi.Field(
                'date',
                required=True,
                location='form',
                schema=coreschema.String()
            ),
            coreapi.Field(
                'user',
                required=True,
                location='form',
                schema=coreschema.Integer()
            ),
        ],
        description='Signoff a users timesheet for a day.'
    )
    serializer_class = TimeEntrySignoffSerializer

    def signoff(self, serializer):
        data = serializer.validated_data
        print(data)
        entries = TimeEntry.objects.filter(
            started_at__date=data['date'],
            user=data['user'],
            signed_off=False
        )
        for entry in entries:
            entry.signed_off = True
            entry.save()

        data = TimeEntrySerializer(entries, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return self.signoff(serializer)
