from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from wip.models import Job, Task
from wip.serializers import JobSerializer, JobTaskSortSerializer


class JobFilter(FilterSet):
    for_timesheet = filters.BooleanFilter(field_name='status__allow_new_timesheet_entries')


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_class = JobFilter

    @action(detail=True, methods=['post'], url_path='sort-tasks')
    def sort_tasks(self, request, pk=None):
        """ Seperate endpoint to sort tasks without posting an entire data set """

        serializer = JobTaskSortSerializer(data=request.data)
        if serializer.is_valid():
            for index, pk in enumerate(serializer.data['tasks']):
                obj = Task.objects.get(pk=pk)
                obj.order = index
                obj.save()
            return Response({'status': 'ok'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
