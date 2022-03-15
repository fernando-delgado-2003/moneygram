import { auth,addUser,updateUser, onAuthStateChanged } from "./firebase/firestore.js"

onAuthStateChanged(auth, (user) => {
	if (user) {
		updateUser(user.uid)
	}
});

