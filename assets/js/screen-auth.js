const d = document,
textAuth = [
	{
		"method": "sign_in",
		"welcome": "Bienvenido de vuelta",
		"text": "Puedes inicia sesión con"

	},
	{
		"method": "sign_up",
		"welcome": "Bienvenido",
		"text": "Puedes registrarte con"
	}
]
const values = window.location.search,
	urlParams = new URLSearchParams(values),
	methodAuth = urlParams.get("q");
if(methodAuth == null){
	location.href="../../"
}
for (let i = 0; i < textAuth.length; i++) {
	if(textAuth[i].method=methodAuth){
		d.getElementById("auth-welcome").innerHTML= textAuth[i].welcome
		d.getElementById("auth-text").innerHTML= textAuth[i].text
	}
}
