from threading import local


_user = local()


class CurrentUserMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # sets the local user to use in code that lives outside the request
        _user.value = getattr(request, 'user', None)

        return self.get_response(request)


def get_current_user():
    if hasattr(_user, 'value'):
        return _user.value
    return None
