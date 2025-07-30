from django.urls import path
from .views import FinancialEntryListCreateView

urlpatterns = [
    path('entries/', FinancialEntryListCreateView.as_view(), name='financial-entry-list-create'),
]