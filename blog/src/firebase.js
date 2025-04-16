// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy8v0iY1NsUhZaULJyCt7FNlf_NAI9oQ8",
  authDomain: "myskmstore-32641.firebaseapp.com",
  projectId: "myskmstore-32641",
  storageBucket: "myskmstore-32641.appspot.com",
  messagingSenderId: "299844295228",
  appId: "1:299844295228:web:965926b00708064e9b8139",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();