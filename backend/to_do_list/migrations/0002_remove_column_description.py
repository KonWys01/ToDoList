# Generated by Django 4.1.3 on 2022-11-27 21:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='column',
            name='description',
        ),
    ]
