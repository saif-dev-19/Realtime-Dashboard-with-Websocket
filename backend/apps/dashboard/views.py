from rest_framework import viewsets

from .models import SensorReading
from .serializers import LatestReadingSerializer, SensorReadingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db.models import Avg, Count, OuterRef, Subquery

from apps.devices.models import Device
from .models import SensorReading



class SensorReadingViewSet(viewsets.ModelViewSet):

    queryset = SensorReading.objects.all().order_by("-created_at")
    serializer_class = SensorReadingSerializer




class DashboardAPIView(APIView):

    def get(self, request):

        total_devices = Device.objects.count()

        online_devices = Device.objects.filter(
            status="online"
        ).count()

        offline_devices = Device.objects.filter(
            status="offline"
        ).count()


        average = SensorReading.objects.aggregate(
            avg_temp=Avg("temperature"),
            avg_humidity=Avg("humidity")
        )


        data = {
            "total_devices": total_devices,
            "online_devices": online_devices,
            "offline_devices": offline_devices,
            "average_temperature": average["avg_temp"],
            "average_humidity": average["avg_humidity"],
        }


        return Response(data)


class LatestReadingsAPIView(APIView):

    def get(self, request):

        latest_reading = SensorReading.objects.filter(
            device=OuterRef("pk")
        ).order_by(
            "-created_at"
        )


        devices = Device.objects.annotate(

            latest_temperature=Subquery(
                latest_reading.values(
                    "temperature"
                )[:1]
            ),

            latest_humidity=Subquery(
                latest_reading.values(
                    "humidity"
                )[:1]
            ),

            latest_battery=Subquery(
                latest_reading.values(
                    "battery"
                )[:1]
            ),

            latest_time=Subquery(
                latest_reading.values(
                    "created_at"
                )[:1]
            ),

        )


        data = []

        for device in devices:

            data.append({

                "device_name": device.name,

                "temperature": device.latest_temperature,

                "humidity": device.latest_humidity,

                "battery": device.latest_battery,

                "created_at": device.latest_time,

            })


        serializer = LatestReadingSerializer(
            data,
            many=True
        )


        return Response(
            serializer.data
        )