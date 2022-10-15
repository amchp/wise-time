# Generated by Django 4.0.3 on 2022-10-14 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_historiadelaactividad_name of constraint'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sugerencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255)),
                ('descripcion', models.CharField(max_length=255)),
                ('edad', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='hijo',
            name='edad',
            field=models.IntegerField(default=0),
        ),
    ]