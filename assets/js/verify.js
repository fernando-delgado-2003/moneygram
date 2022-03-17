import { setIdLink,getIdLink, auth,addUser,updateUser, onAuthStateChanged } from "./firebase/firestore.js"
import {message} from "./components/components.js";
alert("antesssss")
onAuthStateChanged(auth, (user) => {
	alert("state")
	if (user) {
		let params = new URLSearchParams(location.search);
		let id = params.get('idlink');
		alert("parametros")
		getIdLink(user.uid)
		.then((data)=>{
			alert("succses")
			if(id == data.data().idLink){
				updateUser(user.uid);
				setIdLink(user.uid, "")
				message("Vista.confirmada", "sucsses");
				setTimeout(()=>{
				location.href="../../home/"
			}, 4500)
			}else{
				
				message("No hagas travesuras", "error")
				setTimeout(() => {
					location.href = "../../home/"
				}, 4500)
			}
		})


	}else{
		alert("No hay seseion")
	}
});

