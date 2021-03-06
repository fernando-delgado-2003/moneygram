import { setIdLink,getIdLink, auth,addUser,updateUser, onAuthStateChanged } from "./firebase/firestore.js"
import {message} from "./components/components.js";
onAuthStateChanged(auth, (user) => {
	if (user) {
		let params = new URLSearchParams(location.search);
		let id = params.get('idlink'),
		type=params.get('type');
		getIdLink(user.uid)
		.then((data)=>{
			if(id == data.data().idLink){
				updateUser(user.uid, type);
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
		location.href="../../"
	}
});

