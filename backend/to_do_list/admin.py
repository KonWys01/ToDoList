from django.contrib import admin

from to_do_list.models import ToDoCategory, Task

admin.site.register(ToDoCategory)
admin.site.register(Task)
