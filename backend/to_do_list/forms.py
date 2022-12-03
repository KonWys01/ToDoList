from django import forms
from .models import ToDoCategory, Task


class ToDoCategoryForm(forms.Form):
    class Meta:
        model = ToDoCategory

        fields = [
            'name',
            'status',
        ]