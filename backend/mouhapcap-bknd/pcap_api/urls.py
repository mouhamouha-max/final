from django.urls import path
from core.views import *
from core.statistics_views import StatisticsView
from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenObtainPairView
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/upload/', UploadAndAnalyzePCAPView.as_view(), name='upload-pcap'),
    path('api/analysis/', AnalysisResultsAPI.as_view(), name='analysis-results'),
    path('sip-statistics/', StatisticsView.as_view(), name='sip_statistics'),
    path('register/', register, name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


