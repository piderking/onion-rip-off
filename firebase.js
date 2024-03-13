
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4DIl3QhR3LXPX5IkCkxeMG5M4Xaul8yg",
  authDomain: "onion-clone.firebaseapp.com",
  projectId: "onion-clone",
  storageBucket: "onion-clone.appspot.com",
  messagingSenderId: "1043858613603",
  appId: "1:1043858613603:web:e696c583422921a10b9f56"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'it';

// Onion Clone THings
let app_name = "Onion"
let email = null
let displayName = null

function logInWithGoogle(){
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    email = user.email
    displayName = user.displayName

    console.log(user.displayName);
    // IdP data available in result.additionalUserInfo.profile.
      // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


function writeDataBase(){
  if(email == null || displayName == null){
    alert("Try signing in with google!")
  } else if ((document.getElementById("trending-1").value == null || document.getElementById("trending-2").value == null || document.getElementById("trending-3").value == null || document.getElementById("trending-4").value == null || document.getElementById("trending-5").value == null) && document.getElementById("trending").checked ){
    alert("Fill out your trending")
  } else {
  // Add a new document in collection "cities"
    db.collection("satires").doc(app_name.toLowerCase()).set({
      name: displayName,
      email: email,
      app_name: app_name,
      image_address: String(document.getElementById("image-address").value),
      headline: String(document.getElementById("headline").value),
      description: String(document.getElementById("description").value),
      trending: [String(document.getElementById("trending-1").value), String(document.getElementById("trending-2").value), String(document.getElementById("trending-3").value), String(document.getElementById("trending-4").value), String(document.getElementById("trending-5").value)],
      global_trending: Boolean(document.getElementById("trending").checked)
    })
    .then(() => {
      console.log("Document successfully written!");
    })
  }
}

function select(){
  let selection = String(document.getElementById("select").value).toLowerCase()
  
  var docRef = db.collection("satires").doc(selection);
  docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
  });

}