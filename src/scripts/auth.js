let userInfo;
let userMessagesRef;
let userDreamsRef;

firebase.auth().onAuthStateChanged((user) => {
    const openChatbotBtn = document.querySelector(".chatbotOpen");
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
                userDreamsRef = userRef.doc(uid).collection('dreams');
                setProfileInfo(userInfo);
                handleHeader();

                // Detectar si el otro usuario esta escribiendo
                if (document.querySelector(".chatbot")) {
                    getMessages(isChatOnline);
                    userRef.doc(userInfo.uid).onSnapshot((doc) => {
                        //console.log("CAMBIO")
                        const user = doc.data();
                        if (user.isTyping && isChatOnline) {
                            chatbotTyping.classList.remove("invisible")
                        } else {
                            chatbotTyping.classList.add("invisible");
                        }
                    })
                }

                if(document.querySelector(".dreamBoard")) {
                    getUserDreams();
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
    const logOutBtn = document.querySelectorAll(".logOutBtn");

    if (logOutBtn) {
        logOutBtn.forEach(elem => {
            elem.addEventListener("click", function (event) {
                event.preventDefault();
                firebase.auth().signOut();
                window.location.href = "index.html"
            })
        })
    }
}