# Generated by Django 4.1.3 on 2022-11-29 19:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0005_alter_task_options_alter_todocategory_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='column_id',
            new_name='category',
        ),
    ]
