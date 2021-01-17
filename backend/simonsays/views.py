from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from myapi.microsoft import speech
from fire.firebase import *
from chatbot.views import *
from myapi.views import *
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

def handler404(request, e):
    return render(request, 'simonsays/index.html')

@csrf_exempt
def index(request):
    return render(request, 'simonsays/index.html')

POSSIBLE_ACTIONS = {
    "init_chat"                     :  lambda d: init_chat(uid=d['uid']),
    "continue_chat"                 :  lambda d: continue_chat(uid=d['uid'], msg=d['msg'], email=d['email']),
    "get_user_info"                 :  lambda d: get_user_info(email=d['email'], uid=d['uid']),
    "update_user_info"              :  lambda d: update_user_info(email=d['email'], uid=d['uid'], data=d['data']),
    "get_children_info"             :  lambda d: get_children_info(pemail=d['email'], puid=d['uid']),
    "add_user_emotion"              :  lambda d: add_user_emotion(email=d['email'], uid=d['uid'], emotion=d['emotion']),
    "update_parent_child_relation"  :  lambda d: update_parent_child_relation(pemail=d['email'], puid=d['uid'], cemail=d['cemail'], cuid=d['cuid']),
    "get_user_awards"               :  lambda d: get_user_awards(email=d['email'], uid=d['uid']),
    "add_user_award"                :  lambda d: add_user_award(email=d['email'], uid=d['uid'], award=d['award']),
    "del_user_award"                :  lambda d: del_user_award(email=d['email'], uid=d['uid'], aid=d['aid']),
    "get_user_schedules"            :  lambda d: get_user_schedules(email=d['email'], uid=d['uid']),
    "add_user_schedule"             :  lambda d: add_user_schedule(email=d['email'], uid=d['uid'], schedule=d["schedule"]),
    "update_user_schedule"          :  lambda d: update_user_schedule(email=d['email'], uid=d['uid'], sid=d['sid'], schedule=d['schedule']),
    "del_user_schedule"             :  lambda d: del_user_award(email=d['email'], uid=d['uid'], aid=d['aid']),
}

POSSIBLE_FIELDS = (
    "email", "uid", "data", "cemail", "cuid", "msg", "award", "aid", "sid", "schedule", "emotion"
)

@csrf_exempt
def general(req):
    print(f"\033[33mIncoming general request {req} \033[0m")
    if req.method != 'POST':
        return JsonResponse({"msg": "incorrect request", "status": "ERROR"})
    
    # user verification
    user = None
    if req.POST.get("email", False):
        #verify account
        email = req.POST.get('email', '')
        uid = req.POST.get('uid', '')
        user = get_user_info(email, uid)
        if user['status'] != 'OK': return JsonResponse({"msg": "incorrect authentication info", "status": "ERROR"})
        user = user['info']
    else:
        return JsonResponse({"msg": "missing authentication info", "status": "ERROR"})
    print("\033[32mAuth - GOOD\033[0m")

    # check action field
    action = None
    if req.POST.get("action", False) and req.POST['action'] in POSSIBLE_ACTIONS.keys():
        action = req.POST['action']
    else:
        return JsonResponse({"msg": "missing/incorrect action", "status": "ERROR"})
    print(f"\033[32mAction {action} - GOOD\033[0m")
    
    # parse all possible info
    input_fields = {}
    for field in POSSIBLE_FIELDS:
        input_fields[field] = req.POST.get(field, '')
    print(f"\033[32mInput field {input_fields} - GOOD\033[0m")
    
    # check files
    if action == "continue_chat" and len(req.FILES) > 0 and req.FILE.get("my_audio", False):
        my_audio = req.FILES['my_audio']
        fs = FileSystemStorage()
        filename = fs.save(my_audio.name, my_audio) # saves the file to `media` folder
        filepath = "{}/{}".format(MEDIA_ROOT, filename)
        data = text_from_voice(filepath)
        if data['status'] != 'OK': return data
        input_fields['msg'] = data['msg']
        print(f"\033[32mFile received - GOOD\033[0m")
    print(f"\033[32mNo file transferred - GOOD\033[0m")

    # perform action
    return JsonResponse(POSSIBLE_ACTIONS[action](input_fields))


