# Generated by Django 4.1.3 on 2022-12-28 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0006_rename_column_id_task_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='order',
            field=models.IntegerField(default=1, editable=False),
        ),
    ]
