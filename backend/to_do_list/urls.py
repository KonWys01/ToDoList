from django.contrib import admin
from django.urls import path, include
from .views import (
    list_all,
    list_to_do_categories,
    list_one_to_do_category,
    list_tasks,
    list_one_task,
    ToDoCategoryListView
    )

urlpatterns = [
    path('listview', ToDoCategoryListView.as_view()),
    path('list', list_to_do_categories),
    path('list/<id>', list_one_to_do_category),
    path('tasks', list_tasks),
    path('tasks/<id>', list_one_task),
    path('all', list_all),
]