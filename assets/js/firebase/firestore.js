import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import { query, getDocs, updateDoc, onSnapshot, getDoc, setDoc, doc, addDoc, getFirestore, collection, increment, where } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import {message, validateEmail} from "../components/components.js"

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
const app = initializeApp(firebaseConfig),
	auth = getAuth(),
	db = getFirestore(),
	d = document;


async function addUser(userId) {
	const docRef = doc(db, `dataUser/${userId}`);


	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		location.href = "../../../home/"
	} else {
		// doc.data() will be undefined in this case
		await setDoc(docRef, {
			punts: 0,
			paypal: "",
			totalClick: 0
		})
		location.href = "../../../home/"


	}

}

function updateUser(userId) {
	updateDoc(doc(db, `dataUser/${userId}`), {
		punts: increment(0.002),
		totalClick: increment(1)
	})


}

async function getPuntsUser(userId, elemtHTML) {
	const docRef = doc(db, `dataUser/${userId}`);
	//COLOCAR EL SALDO DEL USUARIO
	const punts = await getDoc(docRef)
	if (punts.exists()) {
		const puntsUser = punts.data().punts;
		elemtHTML.innerHTML = `$${puntsUser.toFixed(3)} <span class="sub-text">USD</span>`;


		//SOLO SI ESTAMOS EN LA PAGINA DE RETIRAR
		if (d.getElementById("form-withdraw")) {


			const $form = d.getElementById("form-withdraw");

			if (validateEmail($form.querySelector("input[type='email']").value) &&  d.querySelector("form").classList.contains("send")){

				if (punts.data().punts >= 0.30) {
					let inputValue = $form.querySelector("input[type='email']").value
					await updateDoc(doc(db, `dataUser/${userId}`), {
						paypal: inputValue
					})
					let time = new Date(),
						year = time.getFullYear(),
						month = time.getMonth(),
						day = time.getDate();

					time = `${day}/${month}/${year}`
					await setDoc(doc(db, `withdraw/${userId}`), {
						punts: punts.data().punts,
						time: time,
						email: inputValue
					})
					message("Solicitud, en proceso", "sucsses")
				} else {
					message("Aun no alcanza el mínimo de retiro", "error")
				}
				d.querySelector("form").classList.remove("send")

			}




		}

	}
}
async function getPaypal (userId){
 const paypal = await	getDoc(doc(db, `dataUser/${userId}`));
 return paypal
}
async function getVideosYoutube (){
 const videos = await	getDocs(collection(db, `youtube`));
 return videos
}
async function getIdLink(userId){
	const id= getDoc(doc(db, `dataUser/${userId}`));
	return id
}
async function setIdLink (userId, idLink){
	const status = await updateDoc(doc(db, `dataUser/${userId}`), {
	idLink: idLink
	})
	return status
}


export {getIdLink, setIdLink, getVideosYoutube, getPaypal, db, getPuntsUser, doc, addUser, getDoc, auth, updateUser, onAuthStateChanged }
