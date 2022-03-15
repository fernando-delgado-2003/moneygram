import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import {login} from "./firebase/auth.js"
	import {db, doc,addUser} from "./firebase/firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyAULluDXNN1WDGvz4654lkSoMuYLg8VQrE",
    authDomain: "money-video-432c2.firebaseapp.com",
    projectId: "money-video-432c2",
    storageBucket: "money-video-432c2.appspot.com",
    messagingSenderId: "747586536101",
    appId: "1:747586536101:web:28c19cff14b7b207eb034c",
    measurementId: "G-MXGCES2H6Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {

	if(user != null){
			addUser(user.uid)
	}
});

d.querySelector("form").addEventListener("submit", (e)=>{
	e.preventDefault()
	login()

})
