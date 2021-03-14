import React, {useContext, createContext} from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { UserContext } from '../context/UserContext'
import {FirebaseContext} from '../context/FirebaseContext'

import config from '../config/firebase'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();
const functions = firebase.functions();


const setIntention = {
    
    
    
    setIntention: async (todo) => {
        
        console.log("setting intention")
        await db.collection("intentions").doc("thirdrandomstring").set({
            uid: "placeholderforharyshsuid",
            quantity: todo.quantity,
            exercise: todo.exercise,
            day: todo.day,
            time: todo.time,
            place: todo.place
        })
    }   
}

//var randomNumber = Math.floor(Math.random() * motivationalQuotes.length) + 1;
//console.log(motivationalQuotes[1])
export {setIntention}