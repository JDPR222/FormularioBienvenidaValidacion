const firebaseConfig = {
  apiKey: "AIzaSyDB0c6zNk7ez_mv6uMP9I4J1mIkJDdt_Lg",
  authDomain: "formulario-b56a8.firebaseapp.com",
  projectId: "formulario-b56a8",
  storageBucket: "formulario-b56a8.firebasestorage.app",
  messagingSenderId: "384696041671",
  appId: "1:384696041671:web:500138b4a186d167867ee2",
  measurementId: "G-D8W5YZ1JW0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
// escuchamos el submit
document.getElementById("formulario").addEventListener("submit",
(event) => {
    event.preventDefault();

    // validar nombre
    let entradaNombre = document.getElementById("name");
    let errorNombre = document.getElementById("nameError");
    // si el valor del nombre de entrada trimeado esta vacio
    if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Ingresa tu nombre";
      //se agrega una clase css
    errorNombre.classList.add("error-message");
    } else {
    errorNombre.textContent = "";
      //se remueve la  clase css
    errorNombre.classList.remove("error-message");
    }
		
		// validar emal
    let entradaemail = document.getElementById("email");
    let erroremail = document.getElementById("emailError");
    let emailpattern =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // si no coincide da false entonces se muestra el mensaje
    if (!emailpattern.test(entradaemail.value)) {
    erroremail.textContent = "Ingresa un correo valido";
      //se agrega una clase css
    erroremail.classList.add("error-message");
    } else {
        erroremail.textContent = "";
      //se remueve la  clase css
        erroremail.classList.remove("error-message");
    }
    // validar contraseña
    let entradacontraseña = document.getElementById("password")
    let errorcontraseña = document.getElementById("passwordError");
		let contraseñapattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; 
// testea el valor de la contraseña de entrada y si es distinto muestra el mensaje
		if(!contraseñapattern.test(entradacontraseña.value)){
			errorcontraseña.textContent = "La contraseña debe tener: Minimo 8 caracteres, Maximo 15, Al menos una letra mayúscula, Al menos una letra minucula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial";
      //se agrega una clase css
			errorcontraseña.classList.add("error-message");
		}else {
			errorcontraseña.textContent = "";
		//se remueve la  clase css
			errorcontraseña.classList.remove("error-message");
	}
    // si todos los campos estan bien enviar
		// si los errores no estan vacios
		if(!errorNombre.textContent && !erroremail.textContent && !errorcontraseña.textContent){
			// BACKEND QUE reciba la info
			db.collection("usuarios").add({
				nombre: entradaNombre.value,
				email: entradaemail.value,
				password: entradacontraseña.value
		})
		.then((docRef) => {
      alert('El formulario se envio correctamente', docRef.id)
      //limpiar el formulario
      document.getElementById("formulario").reset()
		})
		.catch((error) => {
				alert("Se ha presentado el siguiente error: ", error);
		});
		}
  });
