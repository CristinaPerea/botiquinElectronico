from rest_framework import serializers
from pedidos.models import PedidosSinReceta, PedidosConReceta
from productos.serializers import ProductoEnStockSerializer

class PedidosSinRecetaSerializer(serializers.ModelSerializer):
    productos_en_stock = ProductoEnStockSerializer(many=True, read_only=True)
    class Meta():
        model = PedidosSinReceta
        exclude = []
        fields = ["id", "fecha_pedido", "fecha_entrega", "modificado", "cliente", "productos_en_stock"]


class PedidosConRecetaSerializer(serializers.ModelSerializer):
    productos_en_stock = ProductoEnStockSerializer(many=True)

    class Meta():
        model = PedidosConReceta
        exclude = []
        fields = ["id", "cliente", "productos_en_stock"]


    #
    # id = serializers.ReadOnlyField()  # Sólo queremos que sea de lectura (nunca escribir)
    # id_cliente = serializers.RelatedField(source='cliente', read_only=True)
    # fecha_pedido = serializers.DateField()
    # fecha_entrega = serializers.DateField()
    # modificado = serializers.DateField()
    #
    # def create(self, validated_data):
    #     '''
    #     Crea una instancia de User a partir de los datos de validated_data que contiene valores deserializados
    #
    #     :param validated_data:
    #     :return:
    #     '''
    #     instance = Cliente()
    #
    #     return self.update(instance, validated_data)
    # #
    # def update(self, instance, validated_data):
    #     '''
    #     Actualiza una instance de User a partir de los datos del diccionario
    #     validated_data que contiene valores deserializados
    #     :param instance:
    #     :param validated_data:
    #     :return:
    #     '''
    #     instance.first_name = validated_data.get('first_name')
    #     instance.last_name = validated_data.get('last_name')
    #     instance.username = validated_data.get('username')
    #     instance.email = validated_data.get('email')
    #     instance.edad = validated_data.get('edad')
    #     instance.direccion = validated_data('direccion')
    #     #instance.set_password(validated_data.get('password'))
    #     # Se guarda en la base de datos
    #     instance.save()
    #     return instance
    #
    # def validate_username(self, data):
    #     '''
    #     Valida el username
    #     :param data: nombre de usuario
    #     :return: si el usuario existe, devuelve data, si no, lanzamos excepción "ValidationError"
    #     '''
    #     user = Cliente.objects.filter(username=data)
    #     if not self.instance and len(user) != 0:
    #         raise serializers.ValidationError("Ya existe un usuario con ese username")
    #     #elif self.instance.username != data and len(user) != 0:
    #     #    raise serializers.ValidationError("Ya existe un usuario con ese username")
    #     else:
    #         return data