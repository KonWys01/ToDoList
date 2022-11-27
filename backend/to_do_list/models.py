from django.db import models


class Column(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_finish = models.DateTimeField(null=True)
    id_column = models.ForeignKey(Column, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
