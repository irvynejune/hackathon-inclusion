from django.urls import path
from .views import StoryListCreateView

urlpatterns = [
    path('stories/', StoryListCreateView.as_view(), name='story-list-create'),
] 