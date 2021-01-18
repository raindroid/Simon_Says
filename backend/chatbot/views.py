import time
from django.shortcuts import render
from django.http.response import JsonResponse

import os

from .chatbot_manager import ChatBotManager
from myapi.microsoft.speech import text_from_voice, voice_from_text

from simonsays.settings import MEDIA_ROOT
from myapi.ibm.language import natural_language_understanding
from fire.firebase import add_user_emotion

chatManager = ChatBotManager()
chatTable = {}

def init_chat(uid):
    if uid.strip() == "": return ({"msg": "missing uid", "status": "ERROR"})
    pid = chatManager.create_new()
    if pid is False or pid is None: return ({"msg": "Failed to create a new chat! Server is busy. Try again later", "status": "FAILED"})
    if chatTable.get(uid, False) is not False:
        chatManager.kill(chatTable[uid])
    chatTable[uid] = pid
    msg = chatManager.read_msg(pid)
    print(f"chat table: {chatTable}")

    filepath = voice_from_text(msg, MEDIA_ROOT) # saves the file to `media` folder
    filename = os.path.basename(filepath)

    return ({"msg": msg, "status": "OK", "voice": f"/apis/download/?media={filename}"})

def continue_chat(uid, msg, email):
    if uid.strip() == "": return ({"msg": "missing uid", "status": "ERROR"})
    if msg.strip() == "": return ({"msg": "empty message", "status": "ERROR"})
    pid = chatTable.get(uid, False)
    if pid is False or pid is None: return ({"msg": "failed to find the old chat", "status": "FAILED"})
    back = chatManager.send_msg(pid, msg)
    msg = chatManager.read_msg(pid)

    # TODO analyze the emotion
    try:
        output = natural_language_understanding(msg)
        emo_1 = output.get('emotion', {})
        doc_1 = emo_1.get('document', {})
        emo_2 = doc_1.get('emotion', {})
        emotion = ''
        emo_score = 0
        for emo, score in emo_2.items():
            if score > emo_score:
                emotion = emo
                emo_score = score
        print(f"Emotion - {emotion} detected ")
        add_user_emotion(email, uid, emotion)

    except:
        print(f"Emotion detection failed")
        # time.sleep(0.2)

    finished = False
    print(f"Reply msg is {msg}")
    if msg is None or msg == "": 
        msg = "Bye!"
        finished = True

    # generate voice
    filepath = voice_from_text(msg, MEDIA_ROOT) # saves the file to `media` folder
    filename = os.path.basename(filepath)
    
    if "bye" in msg.lower(): 
        finished = True
        del chatTable[uid] 
    return ({"msg": msg, "status": "OK", "finished": finished, "voice": f"/apis/download/?media={filename}"})

