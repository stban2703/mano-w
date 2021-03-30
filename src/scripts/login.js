const loginForm = document.querySelector(".login__form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userIdentification = loginForm.identification.value;
    const userPassword = loginForm.password.value;
    const query = userRef.where("identification", "==", userIdentification);

    let userInfo;

    query.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userInfo = doc.data();
                console.log(userInfo)
            });

            firebase.auth().signInWithEmailAndPassword(userInfo.email, userPassword)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    console.log(user);
                    window.location.href = "index.html";
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    /*firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });*/

})
