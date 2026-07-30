import os
import django
import random
import time


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "config.settings"
)

django.setup()


from apps.devices.models import Device
from apps.dashboard.models import SensorReading



def generate_data():

    while True:

        devices = Device.objects.all()

        for device in devices:

            temperature = round(
                random.uniform(25, 40),
                2
            )

            humidity = round(
                random.uniform(40, 80),
                2
            )

            battery = random.randint(
                50,
                100
            )


            SensorReading.objects.create(
                device=device,
                temperature=temperature,
                humidity=humidity,
                battery=battery
            )


            print(
                f"{device.name}: {temperature}°C"
            )


        time.sleep(1)



if __name__ == "__main__":
    generate_data()