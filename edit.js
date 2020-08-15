const auth = firebase.auth();

function signIn() {
	var email = document.getElementById("email");
	var pass = document.getElementById("password");
	
	const promise = auth.signInwithEmailAndPassword(email.value, password.value);
	promise.catch (e => alert (e.message));
}

auth.onAuthStateChanged(function(user){
	if (user){
		var email = user.email;
		alert("Signed in " + email);
		document.title = "Cheldie's Resume (edit)";
		$('.login').delay(100).fadeOut(80);
	} else {
		alert("No active user!");
	}
})