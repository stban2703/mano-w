let userInfo;
let userMessagesRef;
let userDreamsRef;
let localMessageList = [];

firebase.auth().onAuthStateChanged((user) => {
    const openChatbotBtn = document.querySelector(".openModal");
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
                handleChatbotWhenIsLogged();

                if (document.querySelector(".dreamBoard")) {
                    //getUserDreams();
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

function handleChatbotWhenIsLogged() {
    const chatbot = document.querySelector(".chatbot");
    if (chatbot) {
        localMessageList.push(
            {
                id: 0,
                type: "bot",
                text: `¡Hola! Soy Alfonso Bot. ${userInfo.sex === "female" ? "Bienvenida" : "Bienvenido"} <strong>${userInfo.name}</strong>,
                dime en qué te puedo ayudar.<br>
                <strong>Elige el tema que desees obtener información:<strong>`,
                itemList: chatBotOptionsList,
                date: Date.now(),
                hour: getMessageHour()
            }
        )

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
    }
}