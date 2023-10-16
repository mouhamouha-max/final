from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .views import UploadAndAnalyzePCAPView

# Dictionnaire de descriptions pour les codes d'erreur
error_descriptions = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "436": "Bad Identity Info",
    "480": "Temporarily Unavailable",
    "481": "Call/Transaction Does Not Exist",
    "486": "Busy Here",
    "484": "Address Incomplete",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway or Proxy Error",
    "503": "Service Unavailable",
}

class StatisticsView(APIView):
    def get(self, request):
        latest_data = UploadAndAnalyzePCAPView.get_latest_data()

        # Partie 1 : Calcul des statistiques générales
        invite_count = 0
        ack_count = 0
        options_count = 0
        bye_count = 0
        cancel_count = 0
        prack_count = 0
        info_count = 0
        client_error_count = 0
        server_error_count = 0

        # Partie 2 : Calcul des erreurs client
        client_error_counts = {
            "400": 0,
            "401": 0,
            "403": 0,
            "404": 0,
            "405": 0,
            "407": 0,
            "408": 0,
            "436": 0,
            "480": 0,
            "481": 0,
            "486": 0,
            "484": 0
        }

        # Partie 3 : Calcul des erreurs serveur
        server_error_counts = {
            "500": 0,
            "501": 0,
            "502": 0,
            "503": 0
        }

        for packet_data in latest_data:
            sip_info = packet_data['sip_info']
            method = sip_info['method']
            response_status = sip_info.get('response_status', '')

            # Partie 1 : Calcul des statistiques générales
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

            if '4' in response_status:
                client_error_count += 1

            if '5' in response_status:
                server_error_count += 1

            # Partie 2 : Calcul des erreurs client
            if response_status in client_error_counts:
                client_error_counts[response_status] += 1

            # Partie 3 : Calcul des erreurs serveur
            if response_status in server_error_counts:
                server_error_counts[response_status] += 1

        # Ajout des descriptions aux erreurs
        client_error_counts_with_desc = {code: {"count": count, "description": error_descriptions[code]} for code, count in client_error_counts.items()}
        server_error_counts_with_desc = {code: {"count": count, "description": error_descriptions[code]} for code, count in server_error_counts.items()}

        statistics_data = {
            "general_statistics": {
                "invite_count": invite_count,
                "ack_count": ack_count,
                "options_count": options_count,
                "bye_count": bye_count,
                "cancel_count": cancel_count,
                "prack_count": prack_count,
                "info_count": info_count,
                "client_error_count": client_error_count,
                "server_error_count": server_error_count
            },
            "client_errors": client_error_counts_with_desc,
            "server_errors": server_error_counts_with_desc
        }

        return Response(statistics_data, status=status.HTTP_200_OK)
