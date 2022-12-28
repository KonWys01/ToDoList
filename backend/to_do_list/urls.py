from django.contrib import admin
from django.urls import path, include
from .views import (
    list_all,
    list_to_do_categories,
    list_one_to_do_category,
    create_category,
    delete_category,
    update_category,
    list_tasks,
    list_one_task,
    create_tasks,
    delete_task,
    update_task,
    get_tasks_by_category,
    ToDoCategoryListView
)

urlpatterns = [
    path('listview', ToDoCategoryListView.as_view()),

    path('list', list_to_do_categories, name='GET all categories'),
    # path('list/<id>', list_one_to_do_category, name='GET category'),
    path('list/create', create_category, name='POST category'),
    path('list/delete/<id>', delete_category, name='DELETE category'),
    path('list/update/<id>', update_category, name='PUT edit category'),

    path('tasks', list_tasks, name='GET all tasks'),
    # path('tasks/<id>', list_one_task, name='GET task'),
    path('tasks/category/<id>', get_tasks_by_category, name='GET task from given category'),
    path('tasks/create', create_tasks, name='POST category'),
    path('tasks/delete/<id>', delete_task, name='DELETE task'),
    path('tasks/update/<id>', update_task, name='PUT edit task'),

    path('all', list_all, name='GET all tasks with categories'),
]
