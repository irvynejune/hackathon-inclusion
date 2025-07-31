from django.db import models
from userauth.models import User

# Create your models here.

class FinancialEntry(models.Model):
    ENTRY_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('funding', 'Funding'),
        ('other', 'Other'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='financial_entries', null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    entry_type = models.CharField(max_length=20, choices=ENTRY_TYPES)
    description = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)
    source = models.CharField(max_length=100, blank=True)  # e.g., M-PESA, cash, etc.

    def __str__(self):
        return f'{self.user.email} - {self.entry_type} - {self.amount}'
