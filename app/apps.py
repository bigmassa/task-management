from django.apps import AppConfig


class SiteAppConfig(AppConfig):
    name = 'app'

    def ready(self):
        # import all bindings and setup channels model bindings
        from .bindings import BaseModelBinding
        from wip import bindings

        BaseModelBinding.register_all()
