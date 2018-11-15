from django.urls import path
from . import views

urlpatterns = [
    path('api/topic/', views.TopicListCreate.as_view()),
    path('api/topic/<int:pk>/', views.UpdateVote.as_view()),
    path('api/user/', views.UserListCreate.as_view()),
]