// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import "firebase/app";
// import firebase from "firebase/app";
// import "firebase/auth";
// parse = require("firebase/auth")

// const { finished } = require("stream");

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js'
// import { getStorage, ref, getDownloadURL} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js'

// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// import {getDatabase, ref, set, child, update, remove}
// from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// const app = initializeApp(firebaseConfig);




// const storage = getStorage();

// Create a reference to 'mountains.jpg'
// const mountainsRef = ref(storage, 'mountains.jpg');

// // Create a reference to 'images/mountains.jpg'
// const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// // While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 











const firebaseConfig = {
  apiKey: "AIzaSyBTYtu1HT4flwXqhgxi3hXSnc3J6I_NQQU",
  authDomain: "websitepeter-137f1.firebaseapp.com",
  databaseURL: "https://websitepeter-137f1-default-rtdb.firebaseio.com",
  projectId: "websitepeter-137f1",
  storageBucket: "websitepeter-137f1.appspot.com",
  messagingSenderId: "928314911890",
  appId: "1:928314911890:web:fdceac9a06521558350a4b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();


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

    var database_ref = database.ref("Users")
    // var ref = Ref.child('users').child(user.uid)

    var user_data = {
      email : email, 
      full_name : full_name,
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()

    }

    database_ref.child('users/' + user.uid).set(user_data)


    alert('User Created')

  })
  .catch(function(error) {
    var error_code = error.code 
    var error_message = error.message;
    alert(error_message)
  })


}


function login() {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is outta line!')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
  
    var user = auth.currentUser
    var database_ref = database.ref();
    var user_data = {
      email : email, 
      full_name : full_name.value,
      favourite_song : favourite_song.value,
      milk_before_cereal : milk_before_cereal.value,
      last_login : Date.now()
    }
    // firebase.database().ref('Users/' + user.uid).set(user_data)
    // console.log(user_data);
    const fs = require(['fs']);


    const content = 'Some content!'

    const saveData = (content) => {
      const finished = (error) => {
        if (error){
          console.error(error)
          return;
        }
      } 

      const jsonData = JSON.parse(JSON.stringify(user_data))
      fs.writeFile('data.json', jsonData, finished)
    }

    saveData(user_data)
    // const data1 = JSON.parse(user_data)
    // console.log(data1)


    
        

    // database_ref.child('/users/' + user.uid).set({

    //   username: full_name,
    //   email: email,
    //   profile_picture : "no"
    // });

    alert('logged in!!')

  })

  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

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



