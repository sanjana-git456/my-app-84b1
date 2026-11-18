from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Appointment, Medication, Vital, User
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    AppointmentSerializer,
    MedicationSerializer,
    VitalSerializer,
)

# Auth endpoints
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'user': UserSerializer(user).data,
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'detail': 'Username and password required.'}, status=status.HTTP_400_BAD_REQUEST)
    from django.contrib.auth import authenticate
    user = authenticate(request, username=username, password=password)
    if not user:
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'user': UserSerializer(user).data,
    })

@api_view(['GET'])
def me_view(request):
    return Response(UserSerializer(request.user).data)

# ViewSets
class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # seniors see their own, caregivers see managed
        user = self.request.user
        if user.is_caregiver:
            return Appointment.objects.filter(caregiver=user)
        return Appointment.objects.filter(senior=user)

    def perform_create(self, serializer):
        serializer.save(senior=self.request.user)

class MedicationViewSet(viewsets.ModelViewSet):
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Medication.objects.filter(senior=self.request.user)

    def perform_create(self, serializer):
        serializer.save(senior=self.request.user)

class VitalViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VitalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Vital.objects.filter(senior=self.request.user)
