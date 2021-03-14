import React, {createContext} from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import config from '../config/firebase'

const FirebaseContext = createContext();

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.firestore();
const functions = firebase.functions();
// TODO: define functions
// e.g. var addMessage = firebase.functions().httpsCallable('addMessage');


const Firebase = {
    // main app functions
    addGoal: async (uid, text, dueDate, progress) => {
        await db.collection("goals").add({
            uid: uid,
            text: text,
            dueDate: dueDate,
            progress: progress
        }).then(docRef => {
            // add to user's list
            db.collection("users").doc(uid).update({
                goals
            })
        });
    },
    getGoals: () => {

    },
    editGoal: () => {

    },
    deleteGoal: () => {

    },
    addTodo: () => {

    },
    getTodos: () => {

    },
    editTodo: () => {

    },
    deleteTodo: () => {

    },

    // auth functions
    getCurrentUser: () => {
        return firebase.auth().currentUser;
    },
    createUser: async (user) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            await Firebase.sendEmailVerification();

            const uid = Firebase.getCurrentUser().uid;
            let profilePhotoUrl = "default";

            await db.collection("users").doc(uid).set({
                username: user.name,
                email: user.email,
                profilePhotoUrl
            });

            if (user.profilePhoto) {
                profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
            }

            delete user.password;
            return {...user, profilePhotoUrl, uid};
        } catch (error) {
            console.log("Error @createUser: ", error.message);
        }
    },
    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;

        try {
            const photo = await Firebase.getBlob(uri);
            const imageRef = firebase.storage().ref("profilePhotos").child(uid);
            await imageRef.put(photo);
            const url = await imageRef.getDownloadURL();

            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url
            });

            return url;
        } catch (error) {
            console.log("Error @uploadProfilePhoto: ", error.message);
        }
    },
    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                resolve(xhr.response);
            }
            xhr.onerror = () => {
                reject(new TypeError("Network request failed."));
            }

            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        })
    },
    getUserInfo: async (uid) => {
        try {
            const user = await db.collection("users").doc(uid).get();
            if (user.exists) {
                return user.data();
            }
        } catch (error) {
            console.log("Error @getUserInfo: ", error.message);
        }
    },
    sendEmailVerification: async () => {
        const user = Firebase.getCurrentUser();
        if (user) {
            user.sendEmailVerification();
        }
    },
    sendPasswordResetEmail: async (email) => {
        const user = Firebase.getCurrentUser();
        if (user) {
            firebase.auth().sendPasswordResetEmail(email);
        }
    },
    logOut: async () => {
        try {
            await firebase.auth().signOut();
            return true;
        } catch (error) {
            console.log("Error @logOut: ", error.message);
        }
        return false;
    },
    logIn: async(email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
};

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider};