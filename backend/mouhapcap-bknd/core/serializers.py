from rest_framework import serializers
from .models import AnalyzedPacket
from django.contrib.auth.models import User
class AnalyzedPacketSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyzedPacket
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:

        model=User
        fields=('email',"first_name","last_name")
