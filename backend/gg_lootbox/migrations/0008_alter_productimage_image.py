# Generated by Django 5.1.7 on 2025-03-31 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gg_lootbox", "0007_alter_productimage_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="productimage",
            name="image",
            field=models.URLField(max_length=1000),
        ),
    ]
