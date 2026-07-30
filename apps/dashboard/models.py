from django.db import models
from apps.devices.models import Device


class SensorReading(models.Model):
    device = models.ForeignKey(
        Device,
        on_delete=models.CASCADE,
        related_name="readings",
    )

    temperature = models.FloatField()
    humidity = models.FloatField()
    battery = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device.name} - {self.temperature}°C"