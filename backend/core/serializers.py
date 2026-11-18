from rest_framework import serializers
from .models import User, Appointment, Medication, Vital
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_caregiver')
        read_only_fields = ('id',)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class AppointmentSerializer(serializers.ModelSerializer):
    senior = UserSerializer(read_only=True)
    caregiver = UserSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ('id', 'senior', 'caregiver', 'title', 'description', 'scheduled_at', 'created_at')
        read_only_fields = ('id', 'senior', 'created_at')

class MedicationSerializer(serializers.ModelSerializer):
    senior = UserSerializer(read_only=True)
    class Meta:
        model = Medication
        fields = ('id', 'senior', 'name', 'dosage', 'frequency', 'next_dose', 'created_at')
        read_only_fields = ('id', 'senior', 'created_at')

class VitalSerializer(serializers.ModelSerializer):
    senior = UserSerializer(read_only=True)
    class Meta:
        model = Vital
        fields = ('id', 'senior', 'type', 'value', 'measured_at')
        read_only_fields = ('id', 'senior', 'measured_at')
