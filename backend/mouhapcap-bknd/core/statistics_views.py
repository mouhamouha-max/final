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
    def count_error_occurrences(self, response_status, error_counts):
        # Supprimer le préfixe "C" et convertir la clé en minuscules pour normaliser la casse
           response_status = response_status
    
           if response_status in error_counts:
                 error_counts[response_status] += 1
           else:
                error_counts[response_status] = 1

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
        client_error_counts = {code: 0 for code in error_descriptions if code.startswith("4")}
        server_error_counts = {code: 0 for code in error_descriptions if code.startswith("5")}

        # Initialisation d'un dictionnaire pour compter les occurrences de chaque code d'erreur
        error_occurrences = {code: 0 for code in error_descriptions}

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
            if response_status and response_status.startswith('4'):
                client_error_count += 1
                self.count_error_occurrences(response_status, client_error_counts)

            # Calcul des erreurs serveur
            if response_status and response_status.startswith('5'):
                server_error_count += 1
                self.count_error_occurrences(response_status, server_error_counts)

            # Comptage des occurrences de chaque code d'erreur
            self.count_error_occurrences(response_status, error_occurrences)

        # Création du dictionnaire des statistiques d'erreurs client avec descriptions
        client_error_data = {
            code: {"count": count, "description": error_descriptions.get(code, "Unknown")} for code, count in client_error_counts.items()
        }

        # Création du dictionnaire des statistiques d'erreurs serveur avec descriptions
        server_error_data = {
            code: {"count": count, "description": error_descriptions.get(code, "Unknown")} for code, count in server_error_counts.items()
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
            "server_error_count": server_error_count,
        }

        # Création du dictionnaire global des statistiques
        statistics_data = {
            "general_statistics": general_statistics,
            "client_errors": client_error_data,
            "server_errors": server_error_data,
            
        }
        print( general_statistics,client_error_count, server_error_count, client_error_counts)

        return Response(statistics_data, status=status.HTTP_200_OK)
