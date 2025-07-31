from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = User
        fields = [
            'email', 'full_name', 'phone', 'location', 'user_type', 'gender', 'disability',
            'disability_type', 'marginalized_groups', 'primary_identity', 'accessibility_needs',
            'language_preference', 'support_priority', 'primary_device', 'literacy_level', 'social_proof',
            'profile_image', 'voice_intro', 'consent_data_collection', 'consent_contact', 'password',
            # Additional fields for different user types
            'creative_skills', 'portfolio_url', 'experience_level', 'preferred_medium',
            'region', 'organization', 'experience_years', 'languages', 'specializations',
            'supervisor_name', 'supervisor_contact',
            'department', 'role', 'access_level', 'emergency_contact', 'security_clearance'
        ]

    def create(self, validated_data):
        # Use email as username since USERNAME_FIELD = 'email'
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],  # Use email as username
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            location=validated_data.get('location', ''),
            user_type=validated_data.get('user_type', 'creative'),
            gender=validated_data.get('gender', 'prefer_not_to_say'),
            disability=validated_data.get('disability', False),
            disability_type=validated_data.get('disability_type', ''),
            marginalized_groups=validated_data.get('marginalized_groups', []),
            primary_identity=validated_data.get('primary_identity', 'creative'),
            accessibility_needs=validated_data.get('accessibility_needs', []),
            language_preference=validated_data.get('language_preference', 'english'),
            support_priority=validated_data.get('support_priority', 'financial'),
            primary_device=validated_data.get('primary_device', ''),
            literacy_level=validated_data.get('literacy_level', ''),
            social_proof=validated_data.get('social_proof', {}),
            profile_image=validated_data.get('profile_image', ''),
            voice_intro=validated_data.get('voice_intro', ''),
            consent_data_collection=validated_data.get('consent_data_collection', False),
            consent_contact=validated_data.get('consent_contact', False),
            # Creative-specific fields
            creative_skills=validated_data.get('creative_skills', ''),
            portfolio_url=validated_data.get('portfolio_url', ''),
            experience_level=validated_data.get('experience_level', 'beginner'),
            preferred_medium=validated_data.get('preferred_medium', 'digital'),
            # Field Agent fields
            region=validated_data.get('region', ''),
            organization=validated_data.get('organization', ''),
            experience_years=validated_data.get('experience_years', '0-1'),
            languages=validated_data.get('languages', ''),
            specializations=validated_data.get('specializations', ''),
            supervisor_name=validated_data.get('supervisor_name', ''),
            supervisor_contact=validated_data.get('supervisor_contact', ''),
            # Admin fields
            department=validated_data.get('department', ''),
            role=validated_data.get('role', ''),
            access_level=validated_data.get('access_level', 'standard'),
            emergency_contact=validated_data.get('emergency_contact', ''),
            security_clearance=validated_data.get('security_clearance', False),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)