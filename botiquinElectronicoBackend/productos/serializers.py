from rest_framework import serializers
from productos.models import ProductoEnStock, Producto


class ProductoEnStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoEnStock
        exclude = []

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        exclude = []

class ProductoWhooshSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        exclude = ['foto_producto', 'duracion', 'descripcion_html']