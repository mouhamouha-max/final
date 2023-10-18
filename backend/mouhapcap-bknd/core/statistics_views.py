from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .views import UploadAndAnalyzePCAPView

# Dictionnaire de descriptions pour les codes d'erreur
error_descriptions = {
    "c400": "Bad Request",
    "c401": "Unauthorized",
    "c403": "Forbidden",
    "c404": "Not Found",
    "c405": "Method Not Allowed",
    "c407": "Proxy Authentication Required",
    "c408": "Request Timeout",
    "c436": "Bad Identity Info",
    "c480": "Temporarily Unavailable",
    "c481": "Call/Transaction Does Not Exist",
    "c486": "Busy Here",
    "c484": "Address Incomplete",
    "c500": "Internal Server Error",
    "c501": "Not Implemented",
    "c502": "Bad Gateway or Proxy Error",
    "c503": "Service Unavailable",
}

class StatisticsView(APIView):
    def get(self, request):
        latest_data = UploadAndAnalyzePCAPView.get_latest_data()

        # Initialisation des compteurs pour les statistiques générales
        invite_count = 0
        ack_count = 0
        options_count = 0
        bye_count = 0
        cancel_count = 0
        prack_count = 0
        info_count = 0
        client_error_count = 0
        server_error_count = 0

        # Initialisation des compteurs d'erreurs client et serveur
        client_error_counts = {code: 0 for code in error_descriptions if code.startswith("c4")}
        server_error_counts = {code: 0 for code in error_descriptions if code.startswith("c5")}

        for packet_data in latest_data:
            sip_info = packet_data['sip_info']
            method = sip_info['method']
            response_status = sip_info.get('response_status', '')

            # Calcul des statistiques générales
            if method == 'INVITE':
                invite_count += 1
            elif method == 'ACK':
                ack_count += 1
            elif method == 'OPTIONS':
                options_count += 1
            elif method == 'BYE':
                bye_count += 1
            elif method == 'CANCEL':
                cancel_count += 1
            elif method == 'PRACK':
                prack_count += 1
            elif method == 'INFO':
                info_count += 1

            # Calcul des erreurs client
            if response_status and response_status.startswith('c4'):
                client_error_count += 1

            # Calcul des erreurs serveur
            if response_status and response_status.startswith('c5'):
                server_error_count += 1

            # Comptage des erreurs client
            if response_status in client_error_counts:
                client_error_counts[response_status] += 1

            # Comptage des erreurs serveur
            if response_status in server_error_counts:
                server_error_counts[response_status] += 1

        # Création du dictionnaire des statistiques d'erreurs client avec descriptions
        client_error_data = {
            code: {"count": count, "description": error_descriptions[code]} for code, count in client_error_counts.items()
        }

        # Création du dictionnaire des statistiques d'erreurs serveur avec descriptions
        server_error_data = {
            code: {"count": count, "description": error_descriptions[code]} for code, count in server_error_counts.items()
        }

        # Création du dictionnaire des statistiques générales
        general_statistics = {
            "invite_count": invite_count,
            "ack_count": ack_count,
            "options_count": options_count,
            "bye_count": bye_count,
            "cancel_count": cancel_count,
            "prack_count": prack_count,
            "info_count": info_count,
            "client_error_count": client_error_count,
            "server_error_count": server_error_count
        }

        # Création du dictionnaire global des statistiques
        statistics_data = {
            "general_statistics": general_statistics,
            "client_errors": client_error_data,
            "server_errors": server_error_data
        }

        return Response(statistics_data, status=status.HTTP_200_OK)
