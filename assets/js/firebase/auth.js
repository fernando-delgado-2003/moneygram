  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { signOut, getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
 
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

  function login() {

  	const provider = new GoogleAuthProvider();
  	signInWithPopup(auth, provider)
  		.then((result) => {
  			// This gives you a Google Access Token. You can use it to access the Google API.
  			const credential = GoogleAuthProvider.credentialFromResult(result);
  			const token = credential.accessToken;
  			// The signed-in user info.
  			const user = result.user;
  		}).catch((error) => {
  			// Handle Errors here.
  			const errorCode = error.code;
  			const errorMessage = error.message;
  			// The email of the user's account used.
  			const email = error.email;
  			// The AuthCredential type that was used.
  			const credential = GoogleAuthProvider.credentialFromError(error);
  			// ...
  		});
  }

  function logout() {
  	const auth = getAuth();
  	signOut(auth).then(() => {
  		console.log("Sesión cerrada")
  	}).catch((error) => {
  		console.log("Error al cerrar la sesión")
  	});
  }


  export { login, auth, logout }
