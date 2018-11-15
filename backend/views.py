from rest_framework import generics,status
from rest_framework.response import Response
from .serializers import UserSerializer, TopicSerializer
from .models import User, Topics

class TopicListCreate(generics.ListCreateAPIView):
    queryset = Topics.objects.all()
    serializer_class = TopicSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UpdateVote(generics.RetrieveUpdateAPIView):
#     queryset = Topics.objects.all()
#     serializer_class = TopicSerializer
#     lookup_field = 'slug'
#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         instance.name = request.data.get("topic_name")
#         instance.save()

#         serializer = self.get_serializer(instance)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)

#         return Response(serializer.data)

class UpdateVote(generics.UpdateAPIView):
    queryset = Topics.objects.all()
    serializer_class = TopicSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)