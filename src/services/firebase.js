import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAyDMLjruqfnmBxWjqFYXlihX5WJaFjuUg",
  authDomain: "skoolinvivo18.firebaseapp.com",
  databaseURL: "https://skoolinvivo18.firebaseio.com",
  projectId: "skoolinvivo18",
  storageBucket: "skoolinvivo18.appspot.com",
  messagingSenderId: "626166117104",
  appId: "1:626166117104:web:dfa579366acbf634a8c835",
  measurementId: "G-NRF8ZWL0ZG"
};


firebase.initializeApp(firebaseConfig)
export const db = firebase.database()