from django.core.signals import Signal

pre_bulk_update = Signal(providing_args=["queryset", "update_kwargs"])
post_bulk_update = Signal(providing_args=["updated_pks", "update_kwargs"])
