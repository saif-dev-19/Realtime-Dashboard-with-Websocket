import json

from channels.generic.websocket import AsyncWebsocketConsumer


class DashboardConsumer(
    AsyncWebsocketConsumer
):

    async def connect(self):
        print("========== CONNECT METHOD CALLED ==========")
        self.group_name = "dashboard"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()
    print("========= ACCEPT DONE ==========")

    async def disconnect(self, close_code):
        print(
            "DISCONNECTED:",
            close_code
        )

        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
    

    async def send_sensor_data(
        self,
        event
    ):
        print("EVENT FROM REDIS:", event)
        await self.send(
            text_data=json.dumps(
                event["data"]
            )
        )