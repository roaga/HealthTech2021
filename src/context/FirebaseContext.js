import React, {createContext} from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import config from '../config/firebase'
import { getMediaLibraryPermissionsAsync } from 'expo-image-picker'

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
    addGoal: async (goal) => {
        await db.collection("goals").add({
            uid: goal.uid,
            goal: goal.goal,
            day: goal.day,
            completed: goal.completed,
            created: goal.created
        });
    },
    getGoals: async () => {
        return await db.collection("goals").where("uid", "==", Firebase.getCurrentUser().uid).get().then((querySnapshot) => {
            let goals = [];
            querySnapshot.forEach((doc) => {
                goals.push({id: doc.id, data: doc.data()});
            });
            return goals;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },
    editGoal: async (goal) => {
        await db.collection("goals").doc(goal.id).set(goal.data);
    },
    deleteGoal: () => {

    },
    addTodo: async (todo) => {
        await db.collection("intentions").add({
            uid: todo.uid,
            quantity: todo.quantity,
            exercise: todo.exercise,
            day: todo.day,
            time: todo.time,
            place: todo.place,
            completed: todo.completed,
            created: todo.created
        })
    },
    getTodos: async () => {
        return await db.collection("intentions").where("uid", "==", Firebase.getCurrentUser().uid).get().then((querySnapshot) => {
            let todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({id: doc.id, data: doc.data()});
            });
            return todos;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            return [];
        });
    },
    editTodo: async (todo) => {
        await db.collection("intentions").doc(todo.id).set(todo.data);
    },
    deleteTodo: () => {

    },
    addUserSentiment: async (value) => {
        await db.collection("users").doc(Firebase.getCurrentUser().uid).update({
            sentiment: firebase.firestore.FieldValue.arrayUnion(value)
        });
    },
    getSuggestion: async () => {
        let sentiment = await Firebase.getUserInfo(Firebase.getCurrentUser().uid);
        sentiment = sentiment["sentiment"].slice(Math.max(sentiment["sentiment"].length - 5, 0)); // get last 5 sentiments
        let sentimentSum = sentiment.reduce((a, b) => a + b, 0);
        if (sentimentSum < 0) {
            return "Try changing up your workout, because we think something's not working for you.\nExperiment with the type, frequency, and intensity of exercise."
        } else {
            return "Keep at it! You've been doing great!"
        }
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
                profilePhotoUrl,
                sentiment: []
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