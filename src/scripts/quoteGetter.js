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
    giveQuote: async () => {
        console.log("hi")
        const motivationalQuotes = []
        await db.collection("motivationalQuotes").get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                motivationalQuotes.push(doc.data());
          });
        });
        //console.log(motivationalQuotes)
        var randomNumber = Math.floor(Math.random() * motivationalQuotes.length) + 1;
        console.log(motivationalQuotes[randomNumber].quote)
        return (motivationalQuotes[randomNumber].quote)
    }   
}

//var randomNumber = Math.floor(Math.random() * motivationalQuotes.length) + 1;
//console.log(motivationalQuotes[1])
export {getQuote}