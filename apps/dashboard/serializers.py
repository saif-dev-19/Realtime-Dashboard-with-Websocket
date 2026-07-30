from rest_framework import serializers

from .models import SensorReading

from .models import SensorReading

class SensorReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorReading
        fields = "__all__"



from rest_framework import serializers


class LatestReadingSerializer(serializers.Serializer):

    device_name = serializers.CharField()

    temperature = serializers.FloatField(
        allow_null=True
    )

    humidity = serializers.FloatField(
        allow_null=True
    )

    battery = serializers.IntegerField(
        allow_null=True
    )

    created_at = serializers.DateTimeField(
        allow_null=True
    )