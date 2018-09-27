import json
import requests

from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.views.generic.base import View


class MakeCall(LoginRequiredMixin, View):

    def render_json_response(self, context_dict, status=200):
        json_context = json.dumps(context_dict, cls=DjangoJSONEncoder).encode('utf-8')
        return HttpResponse(json_context, content_type='application/json', status=status)

    def post(self, request, *args, **kwargs):
        token = request.user.gradwell_token
        ext = request.user.gradwell_extension
        tel = kwargs['telephone_number']

        if token and ext:
            url = settings.GRADWELL_API_URL.format(token, ext, tel)
            response = requests.post(url, verify=False)
            if response.status_code == 200:
                response_dict = {
                    'status': 'ok',
                    'message': 'We are calling you now on ext {}'.format(ext)
                }
                return self.render_json_response(response_dict, status=200)
            else:
                response_dict = {
                    'status': 'error',
                    'message': 'Something went wrong'
                }
                return self.render_json_response(response_dict, status=400)
        else:
            response_dict = {
                'status': 'error',
                'message': 'You are missing your gradwell details'
            }
            return self.render_json_response(response_dict, status=400)
