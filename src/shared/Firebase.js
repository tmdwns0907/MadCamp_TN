//import * as firebase from 'firebase';
import firebase from 'firebase';

let database;
let config = {
    apiKey: "AIzaSyDKRgb4E15ZF24UxffPJeQUEcKED59bZYE",
    authDomain: "madcamp-tn.firebaseapp.com",
    databaseURL: "https://madcamp-tn.firebaseio.com",
    projectId: "madcamp-tn",
    storageBucket: "madcamp-tn.appspot.com",
    messagingSenderId: "402272237445",
    appId: "1:402272237445:web:4e98798802ba6f5f95f6ec",
    measurementId: "G-9KS34GS0B8"
}

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  database = firebase.database()
}