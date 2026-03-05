from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'team']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    workout = WorkoutSerializer(read_only=True)
    class Meta:
        model = Activity
        fields = ['id', 'user', 'workout', 'duration', 'timestamp']

class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score', 'updated_at']
