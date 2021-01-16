import azure.cognitiveservices.speech as speechsdk
from azure.cognitiveservices.speech import AudioDataStream, SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import os
# from myapi.keys import api_keys

# from django.http import JsonResponse

api_keys = {
    "microsoft-speech": {
        "key": "ec82cab57d764954b9b01ec6ea0d74ee",
        "region": "eastus"
    }
}

def speech_from_file(file):
    if file[-4:] != ".wav":
        print("error")
        return
        # return JsonResponse({"error": "file type error"})
    speech_config = speechsdk.SpeechConfig(subscription=api_keys["microsoft-speech"]["key"], region=api_keys["microsoft-speech"]["region"])
    audio_input = speechsdk.AudioConfig(filename=file)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)
    
    result = speech_recognizer.recognize_once_async().get()
    # return JsonResponse(result.text)
    print(result.text)
    return result.text
    
def voice_from_text(text, path):
    filepath = "{}/speech.wav".format(path)
    if os.path.isfile(filepath): os.remove(filepath)
    
    speech_config = speechsdk.SpeechConfig(subscription=api_keys["microsoft-speech"]["key"], region=api_keys["microsoft-speech"]["region"])
    audio_config = AudioOutputConfig(filename=filepath)
    synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    synthesizer.speak_text_async("The Birch canoe slid on the smooth planks. Glue the sheet to the dark blue background.")

    return path
