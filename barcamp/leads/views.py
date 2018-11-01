from rest_framework import generics
from leads.models import User, Topic
from leads.serializers import TopicSerializer, UserSerializer

class TopicListCreate(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer