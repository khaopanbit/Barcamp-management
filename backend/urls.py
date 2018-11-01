from django.urls import path
from . import views

urlpatterns = [
    path('api/speaker/', views.SpeakerListCreate.as_view()),
]