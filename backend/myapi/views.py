from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from simonsays.settings import MEDIA_ROOT
from myapi.microsoft.speech import text_from_voice, voice_from_text
from django.views.static import serve
import os

# Create your views here.

def index(req):
    data = {
        'listOfApis': ["microsoft/speech-to-text", "microsoft/text-to-speech", "ibm/sentiment"]
    }
    return JsonResponse(data)

def test(req):
    data = {
        "test": "Passed",
        "appName": "SimonSays",
        "status": "OK"
    }
    if req.GET.get('status'):
        data['status'] = req.GET['status']
    return JsonResponse(data)

def speech_test(req):
    return render(req, 'simonsays/speech_to_text.html')


def speech_to_text(req):
    if req.method == 'POST' and req.FILES.get('my_audio', False):
        my_audio = req.FILES['my_audio']
        fs = FileSystemStorage()
        filename = fs.save(my_audio.name, my_audio) # saves the file to `media` folder
        filepath = "{}/{}".format(MEDIA_ROOT, filename)
        data = text_from_voice(filepath)
        return JsonResponse(data)
    return JsonResponse({"msg": "missing audio file", "status": "ERROR"})

def text_to_speech(req):
    if req.method == 'POST' and req.POST.get('speech', False):
        speech = req.POST['speech']
        filepath = voice_from_text(speech, MEDIA_ROOT) # saves the file to `media` folder
        filename = os.path.basename(filepath)
        return JsonResponse({"msg": "/apis/download/?media={}".format(filename), "status": "OK"})
    return JsonResponse({"msg": "missing speech content", "status": "ERROR"})

def download(req):
    if req.method == 'GET' and req.GET.get('media', False):
        filename = req.GET['media']
        filepath = "{}/{}".format(MEDIA_ROOT, filename)
        if os.path.exists(filepath):
            return serve(req, os.path.basename(filepath), os.path.dirname(filepath))
    return JsonResponse({"msg": "file not found", "status": "ERROR"})
