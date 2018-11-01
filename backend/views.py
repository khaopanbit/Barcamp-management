from rest_framework import generics
from .serializers import SpeakerSerializer
from .models import Speaker

class SpeakerListCreate(generics.ListCreateAPIView):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer