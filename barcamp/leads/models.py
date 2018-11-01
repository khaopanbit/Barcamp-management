from django.db import models

class Topic(models.Model):
    topic_head = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    start_time = models.TimeField('start time')
    end_time = models.TimeField('end time')
    speaker = models.CharField(max_length=100)
    vote = models.IntegerField(default=0)
    room = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.topic_head + 'by' + self.speaker


class User(models.Model):
    name = models.CharField(max_length=100)
    vote = models.IntegerField(default=0)
    def __str__(self):
        return self.name