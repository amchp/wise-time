# Generated by Django 4.0.3 on 2022-11-05 23:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_logro_notificacion_logrohijo_logro_hijos'),
    ]

    operations = [
        migrations.AddField(
            model_name='actividad',
            name='creado',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
