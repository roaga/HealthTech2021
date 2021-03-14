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

const getQuote = {
    postToDB: async (text) => {
        console.log('grabbing a quote')
        const motivationalQuotes = []
        await db.collection("motivationalQuotes").get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                motivationalQuotes.push(doc.data());
          });
        });

        return
 
    }
}

export {getQuote}