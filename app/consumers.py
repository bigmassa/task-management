from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ModelBindingConsumer(AsyncJsonWebsocketConsumer):
    group = 'data_binding'

    async def connect(self):
        """ Connect """

        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            await self.accept()
            await self.join_group()

    async def join_group(self):
        """ Join group """

        await self.channel_layer.group_add(self.group, self.channel_name)

    async def disconnect(self, code):
        """ Disconnect """

        await self.channel_layer.group_discard(self.group, self.channel_name)

    async def data_binding(self, event):
        """ Send event on channel. """

        await self.send_json(event)
