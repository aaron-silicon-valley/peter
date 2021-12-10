// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import "firebase/app";
// import firebase from "firebase/app";
// import "firebase/auth";
// parse = require("firebase/auth")


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js'
import { getStorage, ref, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js'



// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTYtu1HT4flwXqhgxi3hXSnc3J6I_NQQU",
  authDomain: "websitepeter-137f1.firebaseapp.com",
  projectId: "websitepeter-137f1",
  storageBucket: "websitepeter-137f1.appspot.com",
  messagingSenderId: "928314911890",
  appId: "1:928314911890:web:fdceac9a06521558350a4b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()


function register() {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById("full_name").value
  favourite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('email or password is outta line !!!!')
    return

  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('one or more field are outta line !!!')
    return 
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()


    var user_data = {
      email : email, 
      full_name : full_name,
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()

    }

    database_ref.child('users/', + user.uid).set(user_data)








    alert('User Created')

  })
  .catch(function(error) {
    var error_code = error.code 
    var error_message = error.message;
    alert(error_message)
  })


}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true){
    return true
  }else{
    return false
  }

}

function validate_password(password) {
  if(password< 6){
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }
  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}