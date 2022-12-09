import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django.db.models import Exists, OuterRef
from django.forms.models import model_to_dict
from django.views.generic import ListView

from . import models
from .models import ToDoCategory, Task

from django.views.decorators.csrf import csrf_exempt


class ToDoCategoryListView(ListView):
    model = ToDoCategory

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['data'] = ToDoCategory.objects.all()
        return context


#
#
# class TaskListView(ListView):
#     model = Task


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    from datetime import date, datetime
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def get_body_from_request(request) -> dict:
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return body


def list_tasks(request):
    content = Task.objects.all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


@csrf_exempt
def create_tasks(request):
    if request.method == "POST":
        body = get_body_from_request(request)
        name = body['name']
        description = body['description']
        category_id = body['category']
        category = ToDoCategory.objects.get(id=category_id)
        obj = Task.objects.create(
            name=name,
            description=description,
            category=category
        )
        obj.save()
        return redirect('/tasks')


@csrf_exempt
def delete_task(request, id):
    if request.method == "DELETE":
        Task.objects.filter(id=id).delete()
        return redirect('/tasks')


@csrf_exempt
def update_task(request, id):
    if request.method == "PUT":
        category = Task.objects.filter(id=id)
        body = get_body_from_request(request)
        category.update(**body)
        return redirect('/tasks')


def list_one_task(request, id: int):
    content = Task.objects.filter(id=id).all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


def get_tasks_by_category(request, id: int):
    content = Task.objects.filter(category=id).all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


def list_to_do_categories(request):
    content = ToDoCategory.objects.all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


@csrf_exempt
def create_category(request):
    if request.method == "POST":
        body = get_body_from_request(request)
        name = body['name']
        status = body['status']
        obj = ToDoCategory.objects.create(
            name=name,
            status=status
        )
        obj.save()
        return redirect('/list')


@csrf_exempt
def delete_category(request, id):
    if request.method == "DELETE":
        ToDoCategory.objects.filter(id=id).delete()
        return redirect('/list')


@csrf_exempt
def update_category(request, id):
    if request.method == "PUT":
        category = ToDoCategory.objects.filter(id=id)
        body = get_body_from_request(request)
        category.update(**body)
        return redirect('/list')


def list_one_to_do_category(request, id: int):
    content = ToDoCategory.objects.filter(id=id).all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


def list_all(request):
    categories = {'data': list(ToDoCategory.objects.all().values('id'))}
    for category in categories['data']:
        category['tasks'] = list(Task.objects.filter(category=category['id']).values())
    return JsonResponse(categories)
