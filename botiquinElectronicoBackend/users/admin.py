from django.contrib import admin

# Register your models here.
from users.models import Cliente

class ClienteAdmin(admin.ModelAdmin):
    icon = '<i class="material-icons">account_box</i>'

admin.site.register(Cliente, ClienteAdmin)