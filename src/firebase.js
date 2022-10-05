import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyA91I7bqJ8DdYB4VG4bOE9YPlOFXZ4G4CQ",
    authDomain: "react-slack-clone-985c3.firebaseapp.com",
    databaseURL: "https://react-slack-clone-985c3.firebaseio.com",
    projectId: "react-slack-clone-985c3",
    storageBucket: "react-slack-clone-985c3.appspot.com",
    messagingSenderId: "170625803165",
    appId: "1:170625803165:web:858e526bd72dc652bb8574",
    measurementId: "G-F13K3LX65K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;