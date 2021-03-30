let userInfo;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid;
        userRef.doc(uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                userInfo = data;
                userInfo.uid = uid;
                handleHeader();
            }
        })
    } else {
        console.log("Not logged")
    }
});

handleLogOut();

function handleLogOut() {
    const logOutBtn = document.querySelector(".logOutBtn");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            firebase.auth().signOut();
            window.location.href = "index.html"
        })
    }
}