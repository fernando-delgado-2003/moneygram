import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import { query, getDocs, updateDoc, onSnapshot, getDoc, setDoc, doc, addDoc, getFirestore, collection, increment, where } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { random, generateId, message, validateEmail } from "../components/components.js"
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
	d = document,
	fees=1100;


async function addUser(user, ref) {
	const docRef = doc(db, `dataUser/${user.uid}`);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		location.href = "../../../home/"
	} else {
		if (ref == null) {
			ref = "";
		}
		await setDoc(docRef, {
			punts: 500,
			paypal: "",
			totalClick: 0,
			ref: ref,
			name: user.displayName
		})
		message("Se agrego 500 coins por ser nuevo usuario", "sucsses");
		setTimeout(() => {
			location.href = "../../../home/"
		}, 4000)
	}

}

function updateUser(userId, type) {
	let min, max = "";
	if (type == "youtube") {
		min = 60;
		max = 89;
	} else if (type == "post") {
		min = 30;
		max = 89;
	}
	const punts = random(min, max)
	updateDoc(doc(db, `dataUser/${userId}`), {
		punts: increment(punts),
		totalClick: increment(1)
	})


}

async function getPuntsUser(userId, elemtHTML, add) {
	const docRef = doc(db, `dataUser/${userId}`);
	//COLOCAR LOS COINS DEL USUARIO
	const punts = await getDoc(docRef)
	if (punts.exists()) {
		const puntsUser = punts.data().punts;
		elemtHTML.innerHTML = `${puntsUser} <span class="sub-text">COINS</span>`;




		//SOLO SI ESTAMOS EN LA PAGINA DE RETIRAR
		if (d.getElementById("form-withdraw")) {


			const $form = d.getElementById("form-withdraw");

			if (validateEmail($form.querySelector("input[type='email']").value) && d.querySelector("form").classList.contains("send")) {

				if (punts.data().punts >= 30000) {
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
		} else if (location.href == '/add/' || location.href == '/add/index.html') {
			if (add) {
				message(`Se le han restado ${fee} coins`, "sucsses")
			}
		}


		return punts
	}
}


async function getVideosUser(userId, punts) {
	moment.lang('es', {
		months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
		monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
		weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
		weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
		weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
	});
	moment.locale("es");
	const data = await getDoc(doc(db, `youtube/${userId}`)),
		$accordion = d.getElementById("accordion");
	let $td = '';

	if (data.exists()) {
		let timestampStart = data.data().start * 1000,
			timestampEnd = data.data().end * 1000;
		/*
		dateStart = new Date(timestampStart *1000),
		dateStart2 = new Date(timestampStart*1000),
		dateEnd = new Date(timestampEnd *1000),
		dateEnd2= new Date(timestampEnd*1000);
		*/
		await fetch(`https://api-ssl.bitly.com/v4/bitlinks/${data.data().id}`, {
				headers: {
					'Authorization': '7bf94f0e727eff0fe7017e0f7a7a982286b4473b'
				}
			})
			.then(res => res.json())
			.then((dataLink) => {

				$accordion.innerHTML = `
				<div class="card">
				<div class="card-header" id="card-header">
					<button type="button">${dataLink.title}</button>
					<span id="view-links"><i class='bx bx-show'></i></span>
				</div>
				<div class="card-body">
					<p>Agregado un ${moment(timestampStart).format('dddd')} a las ${moment(timestampStart).format('LT')} en ${moment(timestampStart).format('ll')}</p>
					<p>Se pausara un ${moment(timestampEnd).format('dddd')} a las ${moment(timestampEnd).format('LT')} en ${moment(timestampEnd).format('ll')}</p>

					<form id="form-add-time">
						<h4>Agrega mas tiempo</h4>
						<div class="btns-time">
						<button type="button" data-time="1" class="btn-time">5 horas</button>
						<button type="button" data-time="3" class="btn-time">15 horas</button>
						<button type="button" data-time="5" class="btn-time"> 24 horas (aproximado)</button>
						</div>

						<div>
						<input type="number" name="number"id="time" value="1" />
						<button type="submit" id="add-time" class="button">Añadir</button>
						</div>
						<p class="message-note center"> 1 = 5 horas, 2 = 10 horas y haci sucesivamente </p>
					</form>
				</div>
			</div>
		`;
				updateTimeVideo(userId, punts, timestampEnd)
			})
		await fetch(`https://api-ssl.bitly.com/v4/bitlinks/${data.data().id}/clicks?unit=month&units=1`, {
				headers: {
					'Authorization': '7bf94f0e727eff0fe7017e0f7a7a982286b4473b'
				}
			})
			.then(res => res.json())
			.then((dataClick) => {
				accordion()
				if (dataClick.message != "UPGRADE_REQUIRED") {

					d.getElementById("view-links").innerHTML += `
						${dataClick.link_clicks[0].clicks}
			`;
				}
			})
	}
	else {
		d.getElementById("add-video").classList.remove("disabled")
	}

}

 function updateTimeVideo(userId, punts, timeEnd) {
	let $form = d.getElementById("form-add-time"),
	$btnsTime = d.querySelectorAll(".btns-time");
	
	$btnsTime.forEach((btn)=>{
		btn.addEventListener("click", (e)=>{
			let number = e.target.dataset.time;
			$form.querySelector("input[type='number']").value= number;
		})
	})

	$form.addEventListener("submit",async (e) => {
		e.preventDefault()

		let data = Object.fromEntries(new FormData(e.target))
		if (!isNaN(data.number)) {
			if (punts >= (fees * data.number)) {
				let timestampEnd = timeEnd / 1000,
					start = Date.now() / 1000,
					x = data.number * 5;

				if (parseInt(start) < timestampEnd) {
					updatePuntsForAddVideo(userId, fees*data.number)
			let status= await updateDoc(doc(db, `youtube/${userId}`), {
						end: increment(3600 * x)
					})

				} else {
			updatePuntsForAddVideo(userId, fees*data.number)
			let status = await updateDoc(doc(db, `youtube/${userId}`),{
						start: start,
						end: start + (3600 * x)
					})
				}
				let fees2 = fees;

				punts = punts - (fees2*data.number);
									message(`Se agregaron ${x} horas a su vídeo`, "sucsses")

			}else{
				let feesNew = fees*data.number;
				message(`Necesitas ${feesNew.toLocaleString('en-US')} coins y le faltan ${(feesNew-punts).toLocaleString('en-US')} coins para continuar`, "normal")
				
			}
		}
	})

}

function accordion() {
	//PARA CUANDO SE PUEDA AGREGAR MAS DE UN VÍDEO

	let cards = d.querySelectorAll(".card");

	cards.forEach((card, i) => {
		card.querySelector(".card-header").addEventListener("click", (e) => {
			let cardBodyHeight = card.querySelector(".card-body").scrollHeight;
			card.classList.toggle("active")
			if (card.classList.contains("active")) {
				card.querySelector(".card-body").style.height = `${cardBodyHeight}px`;
			} else {
				card.querySelector(".card-body").style.height = `0`;
			}
		})
	})

}


async function getPaypal(userId) {
	const status = await getDoc(doc(db, `dataUser/${userId}`));
	return status
}
async function getVideosYoutube() {
	const videos = await getDocs(collection(db, `youtube`));
	return videos
}
async function getIdLink(userId) {
	const id = getDoc(doc(db, `dataUser/${userId}`));
	return id
}
async function setIdLink(userId, idLink) {
	const status = await updateDoc(doc(db, `dataUser/${userId}`), {
		idLink: idLink
	})
	return status
}

async function updatePuntsForAddVideo(userId) {
	
	await updateDoc(doc(db, `dataUser/${userId}`), {
		userPointsAddVideo: increment(fees),
		punts: increment(-fees)
	})
	let punts = getPuntsUser(userId, d.getElementById("punts"), true)
punts
.then((data)=>{
	getVideosUser(userId, data.data().punts, fees)
	document.getElementById("add-video").classList.add("disabled")
})
}

async function addVideo(user, url, start, end, id) {

	const docRef = doc(db, `youtube/${user.uid}`);
	const status = await setDoc(docRef, {
		link: url,
		start: start,
		end: end,
		id: id

	});

	message("Su video fue agregado correctamente", "sucsses")
}



async function getCodeRef(userId) {
	const code = await getDoc(doc(db, `dataUser/${userId}`))
	return code
}
async function setCodeRef(user) {
	let name = user.displayName,
		nameShort = [];

	name = name.replace(" ", "");
	name = name.split("");
	for (let i = 0; i < 2; i++) {
		nameShort.push(random(0, name.length - 1))
	}
	const code = `${generateId()}${name[nameShort[0]]}${name[nameShort[1]]}`,
		codeStatus = await updateDoc(doc(db, `dataUser/${user.uid}`), {
			codeRef: code
		})
	return codeStatus

}
async function getUserRef(codeRef) {
	const userRef = collection(db, 'dataUser');
	const q = query(userRef, where("ref", "==", codeRef))
	const querySnapShot = await getDocs(q);
	let template = "";

	querySnapShot.forEach((docu) => {
		template += `
			<li>${docu.data().name}</li>
		`;
	})

	d.getElementById("list-ref").innerHTML = template;
}

export { getVideosUser, updatePuntsForAddVideo, addVideo, getUserRef, setCodeRef, getCodeRef, getIdLink, setIdLink, getVideosYoutube, getPaypal, db, getPuntsUser, doc, addUser, getDoc, auth, updateUser, onAuthStateChanged }
