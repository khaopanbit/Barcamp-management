from django.test import TestCase
from .models import Topics

class TopicModelTests(TestCase):

    def test_string_representation(self):
        topic = Topics(topic_name='BNK', speaker='Jobsan')

        self.assertEqual(str(topic), 'BNK by Jobsan')