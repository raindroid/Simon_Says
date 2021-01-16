
# setup env
# $ export GOOGLE_APPLICATION_CREDENTIALS=`pwd`'/fire/simonsays-firebase.json'

from json import dump
import firebase_admin
from firebase_admin import credentials, firestore
import time
from datetime import date, timedelta
from uuid import uuid4
import os
import datetime

path = os.path.dirname(os.path.abspath(__file__))
cred = credentials.Certificate("{}/simonsays-firebase.json".format(path))
firebase_admin.initialize_app(cred)

def get_user_info(email, uid):
    db = firestore.client()
    users_ref = db.collection(u'users')
    query_ref = users_ref.where('email', '==', email)
    # for q in query_ref.stream():
    #     print(q)
    result = {}
    for doc in query_ref.stream():
        if doc.id == uid: result = doc.to_dict()
    if result.get('email', False):
        result.setdefault('role', 'unknown')
        result.setdefault('children', [])
        result = {'info': result}
        result['status'] = 'OK'
        return result
    else:
        return {"status": "ERROR", "msg": "User {} not found".format(email)}

def update_user_info(email, uid, data):
    data['email'] = email
    db = firestore.client()
    user_ref = db.collection(u'users').document(uid)
    user = user_ref.get()
    if not user.exists: return {"status": "ERROR", "msg": "Unknown UID"}
    if user.to_dict().get('email', False) != email: return {"status": "ERROR", "msg": "Wrong Email"}
    
    user_ref.set(data, merge=True)
    # prepare output 
    user_ref = db.collection(u'users').document(uid)
    result = {
        "status": "OK",
        "info": user_ref.get().to_dict()
    }
    return result

def get_children_info(pemail, puid):
    parent = get_user_info(pemail, puid)
    if parent['status'] != "OK": return parent
    if parent["info"]["role"] != "parent": return {"status": "FAILED", "msg": "You have to become a parent to check children accounts"}

    result = {}
    count = 0
    for child in parent["info"].get("children", []):
        def get_child_basic():
            db = firestore.client()
            users_ref = db.collection(u'users').document(child)
            user = users_ref.get()
            if user.exists:
                return user.to_dict()
            return None
        child_data = get_child_basic()
        if child_data is None: continue

        cemail = child_data['email']
        awards = get_user_awards(cemail, child)
        schedules = get_user_schedules(cemail, child)
        result[child] = {
            "info": child_data,
            "awards": awards,
            "schedules": schedules
        }
        count += 1
    
    return {"status": "OK", "count": count, "data": result}

def add_user_emotion(email, uid, emotion):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    emotions = info["info"].get("emotions", [])
    emotions.append( {
        "time": datetime.datetime.now(),
        "emotion": emotion
    } )
    return update_user_info(email, uid, {"emotions": emotions})

def update_parent_child_relation(pemail, puid, cemail, cuid):
    parent = get_user_info(pemail, puid)
    if parent['status'] != "OK": return parent
    child = get_user_info(cemail, cuid)
    if child['status'] != "OK": return child

    if parent["info"]["role"] != "parent": return {"status": "FAILED", "msg": "You have to become a parent to add child account"}
    if child["info"]["role"] != "child": return {"status": "FAILED", "msg": "This child account is not properly set"}

    parent_data = parent["info"]
    parent_data.setdefault("children", [])
    if cuid not in parent_data["children"]: parent_data["children"].append(cuid)
    return update_user_info(pemail, puid, parent_data)

def get_user_awards(email, uid):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    awards_ref = db.collection("awards")
    query_ref = awards_ref.where('uid', '==', uid)
    result = {}
    for doc in query_ref.stream():
        doc_dict = doc.to_dict()
        del doc_dict['uid']
        result[doc.id] = doc_dict
    
    return {"status": "OK", "awards": result}

def add_user_award(email, uid, award):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    award['uid'] = uid
    award_id = uuid4().hex
    awards_ref = db.collection("awards").document(award_id)
    awards_ref.set(award)
    
    return {"status": "OK", "awardID": award_id}

def del_user_award(email, uid, aid):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    awards_ref = db.collection("awards")
    query_ref = awards_ref.where('uid', '==', uid)
    result = {'status': 'FAILED', "msg": "No award with aid_{} found!".format(aid)}
    for doc in query_ref.stream():
        if doc.id == aid:
            doc.reference.delete()
            result = {"status": "OK"}
    
    return result

def get_user_schedules(email, uid):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    schedules_ref = db.collection("schedules")
    query_ref = schedules_ref.where('uid', '==', uid)
    result = {'schedules': {}}
    for doc in query_ref.stream():
        doc_dict = doc.to_dict()
        del doc_dict['uid']
        result['schedules'][doc.id] = doc_dict
    
    result['status'] = 'OK'
    return result

def add_user_schedule(email, uid, schedule):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    schedule['uid'] = uid
    schedule_id = uuid4().hex
    schedules_ref = db.collection("schedules").document(schedule_id)
    schedules_ref.set(schedule)
    
    return {"status": "OK", "scheduleID": schedule_id}

def update_user_schedule(email, uid, scheduleId, schedule):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    schedule['uid'] = uid
    schedules_ref = db.collection("schedules").document(scheduleId)
    schedules_ref.set(schedule, merge=True)
    
    return {"status": "OK", "scheduleID": scheduleId}

def del_user_schedule(email, uid, sid):
    info = get_user_info(email, uid)
    if info['status'] != 'OK': return info

    db = firestore.client()
    schedules_ref = db.collection("schedules")
    query_ref = schedules_ref.where('uid', '==', uid)
    result = {'status': 'FAILED', "msg": "No schedule with sid_{} found!".format(sid)}
    for doc in query_ref.stream():
        if doc.id == sid:
            doc.reference.delete()
            result = {"status": "OK"}
    
    return result

def dump_collection(collection):
    db = firestore.client()
    query_ref = db.collection(collection)
    print(f"DUMP {collection}")
    for doc in query_ref.stream():
        print(f"{doc.id}: {doc.to_dict()}")


if __name__ == "__main__":
    # send_to_firebase('')
    # read_firebase()
    cemail, cuid = 'wuyucan1998@gmail.com', 'EubmMeIbM7XgmCQFdnu2g9Nfwq42'
    pemail, puid = 'wuyucan1998@live.com', 'GHaHsQbyouH4Xnx2PaE4'
    print("DB Test Start!")
    dump_collection("users")
    dump_collection("awards")
    dump_collection("schedules")

    print('='*30)
    print("\033[32mGet Users Info\033[0m")
    print(get_user_info(cemail, cuid))
    print(get_user_info(pemail, puid))
    input()

    # basic info
    print('='*30)
    print("\033[32m" + "Update Users Info (role)" + "\033[0m")
    print(update_user_info(pemail, puid, {"role": "parent"}))
    print(update_user_info(cemail, cuid, {"role": "child"}))
    input()

    print('='*30)
    print("\033[32m" + "Update Users Info (add child)" + "\033[0m")
    print(update_parent_child_relation(pemail=pemail, puid=puid, cemail=cemail, cuid=cuid))
    input()

    # emotions
    print('='*30)
    print("\033[32m" + "Update Users Info (add emotion)" + "\033[0m")
    print(add_user_emotion(cemail, cuid, "sad"))
    input()

    # award
    print('='*30)
    print("\033[32m" + "Update Users Info (add award)" + "\033[0m")
    print(add_user_award(cemail, cuid, {"type": "emotion-positive", "title": "happy kid"}))
    input()

    print('='*30)
    print("\033[32m" + "Update Users Info (del award)" + "\033[0m")
    print(del_user_award(cemail, cuid, "4140bafab5344598b5be8cbe6afdcc24"))
    input()
    
    print('='*30)
    print("\033[32m" + "Update Users Info (get award)" + "\033[0m")
    print(get_user_awards(cemail, cuid))
    input()
    
    # schedules
    print('='*30)
    print("\033[32m" + "Update Users Info (add schedule)" + "\033[0m")
    print(add_user_schedule(cemail, cuid, {
        "location": "online", "Title": "workout", "startTime": datetime.datetime.now(), "endTime": datetime.datetime.now()+ datetime.timedelta(days = 1)
    }))
    input()

    print('='*30)
    print("\033[32m" + "Update Users Info (update schedule)" + "\033[0m")
    print(update_user_schedule(cemail, cuid, "HP1vtEy92MUlODmBUZeg", {"endTime": datetime.datetime.now()+ datetime.timedelta(days = 10)}))
    input()

    print('='*30)
    print("\033[32m" + "Update Users Info (del schedule)" + "\033[0m")
    print(del_user_schedule(cemail, cuid, "HP1vtEy92MUlODmBUZeg"))
    input()
    
    print('='*30)
    print("\033[32m" + "Update Users Info (get schedule)" + "\033[0m")
    print(get_user_schedules(cemail, cuid))
    input()

    # get all
    print('='*30)
    print("\033[32m" + "Get all children info" + "\033[0m")
    print(get_children_info(pemail, puid))
    input()
    
