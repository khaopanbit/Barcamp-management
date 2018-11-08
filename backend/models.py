from django.db import models

class Topics(models.Model):
    topic_name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    start_time = models.CharField(max_length=40)
    end_time = models.CharField(max_length=40)
    speaker = models.CharField(max_length=100)
    vote = models.IntegerField(default=0)
    room = models.IntegerField(default=0)

    def __str__(self):
        return self.topic_name + ' by ' + self.speaker

class User(models.Model):
    name = models.CharField(max_length=100)
    topic_voted = models.IntegerField(default=0)

    def __str__(self):
        return self.name