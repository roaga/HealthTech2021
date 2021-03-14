import React, {createContext} from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import config from '../config/firebase'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();
const functions = firebase.functions();

const TestDB = {
    postToDB: async (text) => {
        console.log('running this now')
        
        await db.collection("test2").doc("randomStringHere").set({
            email: "harysh2902@gmail.com",
            username: "hmagesh3",
            profilePhotoUrl:"default" 
        })
    }
}

export {TestDB}