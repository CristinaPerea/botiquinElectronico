from rest_framework import serializers
from productos.models import ProductoEnStock


class ProductoEnStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoEnStock
        exclude = []