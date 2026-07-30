from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    SensorReadingViewSet,
    DashboardAPIView,
    LatestReadingsAPIView
)


router = DefaultRouter()

router.register(
    "readings",
    SensorReadingViewSet,
    basename="readings"
)


urlpatterns = [
    path(
        "dashboard/",
        DashboardAPIView.as_view()
    ),
    path(
        "latest-readings/",
        LatestReadingsAPIView.as_view()
    ),
    path(
        "",
        include(router.urls)
    )
]