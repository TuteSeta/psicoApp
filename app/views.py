from django.http import JsonResponse
from core.settings import MONGO_DB

def list_items(request):
    items = list(MONGO_DB.items.find())
    return JsonResponse({'items': items})