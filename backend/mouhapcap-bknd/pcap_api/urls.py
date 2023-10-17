from django.urls import path
from core.views import UploadAndAnalyzePCAPView, AnalysisResultsAPI
from core.statistics_views import StatisticsView
urlpatterns = [
    path('api/upload/', UploadAndAnalyzePCAPView.as_view(), name='upload-pcap'),
    path('api/analysis/', AnalysisResultsAPI.as_view(), name='analysis-results'),
    path('sip-statistics/', StatisticsView.as_view(), name='sip_statistics'),


]


