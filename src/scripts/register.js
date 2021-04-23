const registerForm = document.querySelector(".register__form");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = registerForm.name.value;
    const userSurname = registerForm.surname.value;
    const userEmail = registerForm.email.value;
    const userIdentification = registerForm.identification.value;
    const userPassword = registerForm.password.value;
    const userSex = registerForm.sex.value;

    const query = userRef.where("identification", "==", userIdentification);
    let checkUser;
    query.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                checkUser = doc.data();
                console.log(checkUser);
            })

            if (checkUser) {
                alert("El usuario ya está registrado");
            } else {
                firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
                    .then((userCredential) => {
                        // Signed in
                        const userId = userCredential.user.uid;

                        userRef.doc(userId).set({
                            email: userEmail,
                            name: userName,
                            surname: userSurname,
                            identification: userIdentification,
                            sex: userSex,
                            isTyping: false

                        }).then(function () {
                            window.location.href = "index.html";
                        });
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorCode + ": " + errorMessage)
                    });
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})