let userInfo;
let userMessagesRef;

firebase.auth().onAuthStateChanged((user) => {
    const openChatbotBtn = document.querySelector(".chatbot__openBtn");
    if (user) {
        const uid = user.uid;
        if (openChatbotBtn) {
            openChatbotBtn.classList.remove("hidden")
        }
        userRef.doc(uid).get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                userInfo = data;
                userInfo.uid = uid;
                userMessagesRef = userRef.doc(uid).collection('messages');
                handleHeader();
                if (document.querySelector(".chatbot")) {
                    getMessages(isChatOnline);
                }
            }
        })
    } else {
        console.log("Not logged")
        if (openChatbotBtn) {
            openChatbotBtn.classList.add("hidden")
        }
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