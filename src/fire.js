import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBGxFgH6NXsJqwtnFTMVL7JtX06NSgDG-g",
    authDomain: "journal-cc843.firebaseapp.com",
    projectId: "journal-cc843",
    storageBucket: "journal-cc843.appspot.com",
    messagingSenderId: "1085403479423",
    appId: "1:1085403479423:web:9c9cb9cf9b218b2a4b2e4a"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire