

	var firebaseConfig = {
		apiKey: "AIzaSyDm6w57PlbWhnWgIuvD4KhFkY8IjHUKDuQ",
		authDomain: "mp1-cruz.firebaseapp.com",
		databaseURL: "https://mp1-cruz.firebaseio.com",
		projectId: "mp1-cruz",
		storageBucket: "mp1-cruz.appspot.com",
		messagingSenderId: "407048752716",
		appId: "1:407048752716:web:f188e65caa7f8751ad6ee9"
	};
// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
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
			window.location="index.html";
		} else {
			alert("No active user!");
		}
	})