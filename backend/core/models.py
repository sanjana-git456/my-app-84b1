from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_caregiver = models.BooleanField(default=False)
    # caregivers can be linked to seniors via a many‑to‑many through table
    caregivers = models.ManyToManyField('self', symmetrical=False, related_name='seniors', blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

class Appointment(models.Model):
    senior = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    caregiver = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='managed_appointments')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    scheduled_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} @ {self.scheduled_at}"

class Medication(models.Model):
    senior = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=255)
    frequency = models.CharField(max_length=255)  # e.g. "Twice a day"
    next_dose = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.dosage})"

class Vital(models.Model):
    senior = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vitals')
    type = models.CharField(max_length=100)  # e.g. "Heart Rate"
    value = models.FloatField()
    measured_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-measured_at']
