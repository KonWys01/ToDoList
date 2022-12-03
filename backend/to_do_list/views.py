import json
from django.http import JsonResponse
from django.shortcuts import redirect

from django.views.generic import ListView
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


def get_body_from_post_request(request) -> dict:
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
        body = get_body_from_post_request(request)
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


def list_one_task(request, id: int):
    content = Task.objects.filter(id=id).all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


def list_to_do_categories(request):
    content = ToDoCategory.objects.all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


@csrf_exempt
def create_category(request):
    if request.method == "POST":
        body = get_body_from_post_request(request)
        name = body['name']
        status = body['status']
        obj = ToDoCategory.objects.create(
            name=name,
            status=status
        )
        obj.save()
        return redirect('/list')


def list_one_to_do_category(request, id: int):
    content = ToDoCategory.objects.filter(id=id).all()
    result = {'data': list(content.values())}
    return JsonResponse(result)


def list_all(request):
    tasks = Task.objects.all()
    result = {'data': list(tasks.values(
        'id', 'name', 'description', 'date_creation', 'date_finish',
        'category_id', 'category__status'))
    }
    return JsonResponse(result)
