from django.db import models


def last_order_value():
    return Task.objects.latest('order').order + 1


class ToDoCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'to_do_list_todocategory'

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)  # blank=True == not required
    date_creation = models.DateTimeField(auto_now_add=True)
    date_finish = models.DateTimeField(null=True, blank=True)
    category = models.ForeignKey(ToDoCategory, on_delete=models.CASCADE)
    order = models.IntegerField(editable=False, default=last_order_value)

    class Meta:
        managed = True
        db_table = 'to_do_list_task'

    def __str__(self):
        return self.name
