import os
import django

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()
    from core.models import User, Appointment, Medication, Vital
    from django.utils import timezone
    if User.objects.exists():
        return
    senior = User.objects.create_user(username='senior1', email='senior1@example.com', password='Password123')
    caregiver = User.objects.create_user(username='caregiver1', email='caregiver1@example.com', password='Password123', is_caregiver=True)
    senior.caregivers.add(caregiver)
    Appointment.objects.create(
        senior=senior,
        title='Annual Check‑up',
        description='Visit Dr. Smith',
        scheduled_at=timezone.now() + timezone.timedelta(days=7)
    )
    Medication.objects.create(
        senior=senior,
        name='Lisinopril',
        dosage='10 mg',
        frequency='Once daily',
        next_dose=timezone.now() + timezone.timedelta(hours=8)
    )
    Vital.objects.create(
        senior=senior,
        type='Heart Rate',
        value=72
    )

if __name__ == '__main__':
    if os.getenv('SEED_DEMO_DATA', 'false').lower() == 'true':
        main()
