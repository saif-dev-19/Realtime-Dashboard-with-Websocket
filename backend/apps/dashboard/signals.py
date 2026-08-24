from django.db.models.signals import post_save
from django.dispatch import receiver

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from apps.dashboard.models import SensorReading


@receiver(post_save, sender=SensorReading)
def sensor_created(
    sender,
    instance,
    created,
    **kwargs
):
    print("SIGNAL RUNNING")

    if created:

        channel_layer = get_channel_layer()

        data = {
            "device_id": instance.device.id,

            "device": instance.device.name,

            "temperature": instance.temperature,

            "humidity": instance.humidity,

            "battery": instance.battery,
        }

        async_to_sync(
            channel_layer.group_send
        )(
            "dashboard",

            {
                "type": "send_sensor_data",

                "data": data
            }
        )