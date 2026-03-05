from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.activity = Activity.objects.create(user=self.user, workout=self.workout, duration=30)
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100)

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Test Team')

    def test_user_team(self):
        self.assertEqual(self.user.team, self.team)

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Test Workout')

    def test_activity_duration(self):
        self.assertEqual(self.activity.duration, 30)

    def test_leaderboard_score(self):
        self.assertEqual(self.leaderboard.score, 100)
