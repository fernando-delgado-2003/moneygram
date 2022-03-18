function message(txt, type) {
	if (!document.getElementById("message")) {
		document.querySelector("body").insertAdjacentHTML("beforebegin",
			`
		<div class="message ${type}" id="message">
			<div class="wrap-btn-closed">
			</div>
			<p>${txt}</p>
		</div>
	`
		);

	}
	let $message = document.getElementById("message")
	setTimeout(()=>{
		$message.classList.add("active")
	}, 800)
	setTimeout(() => {
		$message.classList.remove("active");
		setTimeout(() => {
			$message.remove()
		}, 1200)
	}, 3500)
}
function validateEmail(email) {
  if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)){
		return true
  } else {
  	return false
  }
}
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function generateId () { return Math.random().toString(36).substr(2, 18)};
export {random, validateEmail, message, generateId}
