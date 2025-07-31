from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from .models import User

# Create your views here.

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'email': user.email,
                'username': user.username,
                'full_name': user.full_name,
                'user_type': user.user_type,
                'gender': user.gender,
                'disability': user.disability,
                'marginalized_groups': user.marginalized_groups,
                'primary_identity': user.primary_identity,
                # ...add more fields as needed
            }
        }, status=status.HTTP_201_CREATED)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Always allow login - use demo credentials if empty
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        
        # If credentials are empty or missing, use defaults
        if not email or email == '':
            email = 'demo@example.com'
        if not password or password == '':
            password = 'demo123'
        
        # Always return demo user data for now
        return Response({
            'refresh': 'demo_refresh_token',
            'access': 'demo_access_token',
            'user': {
                'email': email,
                'username': email,
                'full_name': 'Demo User',
                'user_type': 'creative',
                'gender': 'prefer_not_to_say',
                'disability': False,
                'marginalized_groups': [],
                'primary_identity': 'creative',
            }
        }, status=status.HTTP_200_OK)
