from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = User
        fields = [
            'email', 'username', 'full_name', 'phone', 'location', 'user_type', 'gender', 'disability',
            'disability_type', 'marginalized_groups', 'primary_device', 'literacy_level', 'social_proof',
            'profile_image', 'voice_intro', 'consent_data_collection', 'consent_contact', 'password'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            location=validated_data.get('location', ''),
            user_type=validated_data.get('user_type', 'creative'),
            gender=validated_data.get('gender', 'prefer_not_to_say'),
            disability=validated_data.get('disability', False),
            disability_type=validated_data.get('disability_type', ''),
            marginalized_groups=validated_data.get('marginalized_groups', []),
            primary_device=validated_data.get('primary_device', ''),
            literacy_level=validated_data.get('literacy_level', ''),
            social_proof=validated_data.get('social_proof', {}),
            profile_image=validated_data.get('profile_image', ''),
            voice_intro=validated_data.get('voice_intro', ''),
            consent_data_collection=validated_data.get('consent_data_collection', False),
            consent_contact=validated_data.get('consent_contact', False),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)