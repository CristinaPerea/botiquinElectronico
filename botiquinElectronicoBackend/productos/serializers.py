from rest_framework import serializers
from productos.models import ProductoEnStock, Producto, Pendiente


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

class PendienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pendiente
        exclude = ['fecha_expiracion']

    def create(self, validated_data):
        obj = Pendiente.objects.create(**validated_data)
        return obj