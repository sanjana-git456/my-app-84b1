from django.contrib import admin
from .models import User, Appointment, Medication, Vital

admin.site.register(User)
admin.site.register(Appointment)
admin.site.register(Medication)
admin.site.register(Vital)
