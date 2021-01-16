from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def index(request):
    data = {
        'listOfApis': ["microsoft/speech-to-text", "microsoft/text-to-speech", "ibm/sentiment"]
    }
    return JsonResponse(data)

def test(req):
    data = {
        "Test": "Passed",
        "AppName": "SimonSays"
    }
    return JsonResponse(data)