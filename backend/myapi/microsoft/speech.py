import os
import azure.cognitiveservices.speech as speechsdk
from azure.cognitiveservices.speech import AudioDataStream, SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import uuid

from myapi.keys import api_keys
from django.http import JsonResponse

def text_from_voice(file):
    if file[-4:] != ".wav": # sanity check
        return JsonResponse({"msg": "file type error", "status": "ERROR"})


    speech_config = speechsdk.SpeechConfig(subscription=api_keys["microsoft-speech"]["key"], region=api_keys["microsoft-speech"]["region"])
    audio_input = speechsdk.AudioConfig(filename=file)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)
    
    result = speech_recognizer.recognize_once_async().get()
    data = {"msg": "", "status": "ERROR"}
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        data["msg"] = result.text
        data["status"] = "OK"
    elif result.reason == speechsdk.ResultReason.NoMatch:
        data["msg"] = "No speech could be recognized: {}".format(result.no_match_details)
        data["status"] = "FAILED"
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        data["msg"] = "Speech Recognition canceled: {}".format(cancellation_details.reason)
        data["status"] = "CANCELED"
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            data["msg"] = ("Error details: {}".format(cancellation_details.error_details))
            data["status"] = "ERROR"

    return data

def voice_from_text(text, path):
    filepath = "{}/speech_{}.wav".format(path, str(uuid.uuid1().hex))
    if os.path.isfile(filepath): os.remove(filepath)
    
    speech_config = speechsdk.SpeechConfig(subscription=api_keys["microsoft-speech"]["key"], region=api_keys["microsoft-speech"]["region"])
    audio_config = AudioOutputConfig(filename=filepath)
    synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    synthesizer.speak_text_async(text)

    return filepath

    
