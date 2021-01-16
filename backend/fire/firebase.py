
# setup env
# $ export GOOGLE_APPLICATION_CREDENTIALS=`pwd`'/fire/simonsays-firebase.json'

import firebase_admin
from firebase_admin import credentials, firestore
import time
from datetime import timedelta
from uuid import uuid4
import os

path = os.path.dirname(os.path.abspath(__file__))
cred = credentials.Certificate("{}/simonsays-firebase.json".format(path))
firebase_admin.initialize_app(cred)

def get_user_info(email, uid):
    db = firestore.client()
    users_ref = db.collection(u'users')
    query_ref = users_ref.where('email', '==', email)
    query_ref = query_ref.where('uid', '==', uid)



def push_to_firebase(email, uid, emotion):
    db = firestore.client()
    start = time.time()
    db_ref = db.collection(u'users').document('Rain')
    db_ref.set({
        'ID': str(uuid4()),
        'age': 19,
        'name': 'RainW'
    })
    end = time.time()
    spend_time = timedelta(seconds=end - start)
    return spend_time



# def update_firebase_snapshot(snapshot_id):
#     start = time.time()
#     db = firestore.client()
#     db.collection('notifications').document(snapshot_id).update(
#         {'is_read': True}
#     )
#     end = time.time()
#     spend_time = timedelta(seconds=end - start)
#     return spend_time

if __name__ == "__main__":
    send_to_firebase('')
    read_firebase()
    # print(os.path.realpath(__file__))