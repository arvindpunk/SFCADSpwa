import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAW4UfRsC3q1LEJpAxUH8GZqUBJWQ5pJtk",
    authDomain: "sf-cads.firebaseapp.com",
    databaseURL: "https://sf-cads.firebaseio.com",
    projectId: "sf-cads",
    storageBucket: "sf-cads.appspot.com",
    messagingSenderId: "421853704272",
    appId: "1:421853704272:web:53ffcd1309a482924a2155",
    measurementId: "G-QVPE9JGSJ5"
};

const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
}

export default initializeFirebase;