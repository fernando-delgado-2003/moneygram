  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
  import { logout } from "./firebase/auth.js";
  import { setIdLink, getPuntsUser, getPaypal, getVideosYoutube } from "./firebase/firestore.js";
  import { message, validateEmail, generateId} from "./components/components.js"

  const firebaseConfig = {
  	apiKey: "AIzaSyAULluDXNN1WDGvz4654lkSoMuYLg8VQrE",
  	authDomain: "money-video-432c2.firebaseapp.com",
  	projectId: "money-video-432c2",
  	storageBucket: "money-video-432c2.appspot.com",
  	messagingSenderId: "747586536101",
  	appId: "1:747586536101:web:28c19cff14b7b207eb034c",
  	measurementId: "G-MXGCES2H6Y"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(),
  	userLogin = auth.currentUser,
  	d = document,
  	$profile = d.getElementById("profile"),
  	zshort = "https://zshort.io/st?api=b81a1877bace42e4f89ea6d4f5948c3b9ef49fa2&url=",
  	adfly = "http://adf.ly/26073619/",
  	myPage= "https://moneygram.vercel.app/"
  	
  	
  onAuthStateChanged(auth, (user) => {
  	if (user) {
  		$profile.innerHTML = `
  		<p class="punts" id="punts"></p>
			<img src="${user.photoURL}" alt="">
			<div class="pop">
				<p class="name-user">${user.displayName}</p>
				<a href="../../withdraw/">Retirar</a>
				<button class="btn-logout" id="btn-logout">
					Cerrar sesión
				</button>
			</div>
		`;
  		if (location.pathname == "/home/" || location.pathname == "/home/index.html") {
  			//LINKS
  			addAds(user);


  			//LINKS CON VIDEOS DE YOUTUBE
  			getVideosYoutube(user.uid)
  				.then((data) => {
  					data.forEach((docu) => {

  					})
  				})
  		} else {
  			let input = d.querySelector("form").querySelector("input[type='email']");
  			getPaypal(user.uid)
  				.then((data) => {
  					if (data.data().paypal != "") {
  						input.value = data.data().paypal
  					}
  				})
  			d.querySelector("form").addEventListener("submit", (e) => {
  				e.preventDefault();
  				d.querySelector("form").classList.add("send")
  				let verifyEmail = validateEmail(input.value);
  				if (verifyEmail) {
  					getPuntsUser(user.uid, d.getElementById("punts"))
  				} else {
  					message("Correo electrónico no válido ", "error")
  				}
  			})
  		}
  		d.getElementById("btn-logout").addEventListener("click", () => {
  			logout()
  			location.href = "../../"
  		})

  		getPuntsUser(user.uid, d.getElementById("punts"))

  		$profile.querySelector("img").addEventListener("click", () => {
  			$profile.querySelector(".pop").classList.toggle("active")
  		})



  	}
  });




  function addAds(user) {
  	const $ad = d.getElementById("ad");
  	

  	let list = "";
  	for (let i = 0; i < 10; i++) {
  		if (i < 5) {
  			list += `<li><a href="${adfly}${myPage}verify/" data-id="${generateId()}" class="adNormal">Link ${i+1}</a></li>`;
  		} else if (i < 10) {
  			list += `<li><a href="${adfly}${myPage}verify/" data-id="${generateId()}" class="adNormal">Link ${i+1}</a></li>`;
  		}

  	}
  	$ad.innerHTML = `
	<ul class="list-links">
		${list}
	</ul>
	`;
	const $adsNormal = d.querySelectorAll(".adNormal");
	
	$adsNormal.forEach((link)=>{
		link.addEventListener("click", (e)=>{
			e.preventDefault();
				setIdLink(user.uid, e.target.dataset.id)
			let linkActuality = e.target.href,
			link = e.target,
			linkNew = document.createElement("a");
			linkActuality = `${linkActuality}?id=${link.dataset.id}`,
			linkNew.href=linkActuality;
			
			linkNew.click()
		})
	})
  }
