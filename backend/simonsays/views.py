from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from myapi.microsoft import speech

def index(request):
    return HttpResponse("<h1>Hello, world. You're at the SimonSays index page.</h1>")
