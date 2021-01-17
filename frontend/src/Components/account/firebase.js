// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import {firebaseConfig} from "./secret";
import { getUserInfo } from "../api/generalAPI";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export let accountInfo = {
    name: "",
    email: "",
    uid: "",
    signed: false
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    // console.log(`creating accout with '${email}' and '${password}'`)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(`sign in successfully as ${user.displayName} ${user.email}`)
        firebase.firestore().collection('users').doc(user.uid).set(
            {name, email}
        )
        accountInfo.email = email
        accountInfo.name = name
        accountInfo.uid = user.uid
        accountInfo.signed = true
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Error with code ${errorCode} and message ${errorMessage}`)
    });
}

export const signinWithGoogle = (callback) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(`sign in successfully as ${user.displayName} ${user.email}`)
    firebase.firestore().collection('users').doc(user.uid).set(
        {name: user.displayName, email: user.email}
    )
    accountInfo.email = user.email
    accountInfo.name = user.displayName
    accountInfo.uid = user.uid
    accountInfo.signed = true
    if (callback) {
        console.log("Executing callback from signinWithGoogle")
        callback(accountInfo)
    }
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log({errorCode, errorMessage, email, credential})
  });
}

export const signinWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
    console.log(`sign in successfully as ${user.user.email}`)
    console.log(user)
    firebase.firestore().collection('users').doc(user.user.uid).set(
        {uid: user.user.uid, email: user.user.email}
    )

    accountInfo.email = email
    // accountInfo.name = user.displayName
    accountInfo.uid = user.user.uid
    accountInfo.signed = true
    getUserInfo(accountInfo, 'get_user_info', data=>{
        accountInfo.name = data.name
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log({errorCode, errorMessage, email})
  });

} 