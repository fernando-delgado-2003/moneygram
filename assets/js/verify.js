import { getIdLink, auth,addUser,updateUser, onAuthStateChanged } from "./firebase/firestore.js"

onAuthStateChanged(auth, (user) => {
	if (user) {
		let params = new URLSearchParams(location.search);
		let id = params.get('id');
		getIdLink(user.uid)
		.then((data)=>{
			if(id == data.data().idLink){
				updateUser(user.uid)
			}
			
		})
	}
});

