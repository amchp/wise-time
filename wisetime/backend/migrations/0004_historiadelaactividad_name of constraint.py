# Generated by Django 4.0.3 on 2022-09-10 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_hijo_puntos'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='historiadelaactividad',
            constraint=models.UniqueConstraint(fields=('hijo_actividad', 'dia'), name='name of constraint'),
        ),
    ]
