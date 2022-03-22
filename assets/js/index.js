  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
  import { logout } from "./firebase/auth.js";
  import { getUserRef, setCodeRef, getCodeRef, setIdLink, getPuntsUser, getPaypal, getVideosYoutube } from "./firebase/firestore.js";
  import { random, message, validateEmail, generateId } from "./components/components.js"

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
  	myPage = "https://moneydrop-verify.vercel.app/"


  onAuthStateChanged(auth, (user) => {
  	if (user) {
  		$profile.innerHTML = `
  		<p class="punts" id="punts"></p>
			<img src="${user.photoURL}" alt="">
			<div class="pop">
				<p class="name-user">${user.displayName}</p>
				<a href ="../../home/">Ganar</a>
				<a href="../../withdraw/">Retirar</a>
				<a href="../../referrals/">Referidos</a>
				<button class="btn-logout" id="btn-logout">
					Cerrar sesión
				</button>
			</div>
		`;
  		if (location.pathname == "/home/" || location.pathname == "/home/index.html") {
  			//LINKS
  			addAds(user);


  			//LINKS CON VIDEOS DE YOUTUBE
  			getVideosYoutube(user)
  				.then((data) => {
  					addAdsYoutube(user ,data)
  				})
  		} else if (location.pathname == "/withdraw/" || location.pathname == "/withdraw/index.html") {
				document.querySelector(".uid").innerHTML= user.uid;

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


  		} else if (location.pathname == "/referrals/" || location.pathname == "/referrals/index.html") {
  			getCodeRef(user.uid)
  				.then((data) => {
  					data = data.data();

  					let btnCreateCode = d.querySelector("input[type='button']");
  					if (data.codeRef == undefined) {

  						btnCreateCode.classList.remove("disabled");
  						btnCreateCode.addEventListener("click", (e) => {
  							setCodeRef(user)
  								.then(() => {
  									getCodeRef(user.uid)
  										.then((dataR) => {
  											btnCreateCode.classList.add("disabled");
  											viewRefs(dataR.data().codeRef)


  										})
  								})
  						})
  					} else {
  						viewRefs(data.codeRef)
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



  	} else {
  		if (location.pathname != "/auth/" || location.pathname != "/auth/index.html") {
  			location.href = "../../"
  		}
  	}
  });




  function addAds(user) {
  	const $ad = d.getElementById("ad");


  	let list = "",
  		id = "";

  	for (let i = 0; i < 10; i++) {
  		id = generateId();
  		if (i < 5) {
  			list += `<li><a href="${adfly}${myPage}posts/post ${random(1,101)}/?idLink=${id}&idUser=${user.uid}" data-id="${id}" class="adNormal">Link ${i+1}</a></li>`;
  		} else if (i < 10) {
  			list += `<li><a href="${adfly}${myPage}posts/post ${random(1, 101)}/?idLink=${id}&idUser=${user.id}" data-id="${id}" class="adNormal">Link ${i+1}</a></li>`;
  		}

  	}
  	$ad.innerHTML = `
	<ul class="list-links">
	<h3>Gana desde 30 a 90 coins, con los anuncios básicos</h3>
		${list}
	</ul>
	`;
  	const $adsNormal = d.querySelectorAll(".adNormal");

  	$adsNormal.forEach((link) => {
  		link.addEventListener("click", (e) => {
  			e.preventDefault();
  			let linkActuality = e.target.href,
  				link = e.target,
  				linkNew = document.createElement("a");

  			e.target.textContent = "Preparando...";

  			linkNew.href = linkActuality;
  			setIdLink(user.uid, e.target.dataset.id)
  				.then((data) => {
  					linkNew.click()
  				})
  		})
  	})
  }


  function addAdsYoutube(user, videos) {
  	const $ad = d.getElementById("ad-youtube");

  	let list = "",
  		id = "",
  		i = 0;
	videos.forEach((video)=>{
		i++;
		id = generateId();
  		list += `<li><a href="${myPage}videos/video ${random(1,101)}/?idLink=${id}&linkYoutube=${video.data().link}&idUser=${user.uid}" data-id="${id}" class="ad-youtube">Video ${i}</a></li>`;
	})
	
	$ad.innerHTML = `
	<h3>Gana desde 60 a 101 coins, viendo videos de Youtube por mínimo de un minuto</h3>
	<ul class="list-links">
		${list}
	</ul>
	`;

  	const $adsYoutube = d.querySelectorAll(".ad-youtube");

  	$adsYoutube.forEach((link) => {
  		link.addEventListener("click", (e) => {
  			e.preventDefault();
  			let linkActuality = e.target.href,
  				link = e.target,
  				linkNew = document.createElement("a");

  			e.target.textContent = "Preparando...";

  			linkNew.href = linkActuality;
  			setIdLink(user.uid, e.target.dataset.id)
  				.then((data) => {
  					linkNew.click()
  				})
  		})
  	})
  }

  function viewRefs(codeRef) {
  	d.getElementById("link-ref").innerHTML = `
			Este es su link de referencia
  		<span>https://moneydrop.vercel.app/auth/?q=sign_up&ref=${codeRef}</span>
  	`;
  	getUserRef(codeRef)
  }
