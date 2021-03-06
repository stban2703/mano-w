let userInfo;
let userMessagesRef;
let userDreamsRef;
let localMessageList = [];

firebase.auth().onAuthStateChanged((user) => {
    const openChatbotBtn = document.querySelector(".floatButton");
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
                    getUserDreams();
                }

                if (document.querySelector(".callToAction__btn")) {
                    document.querySelector(".callToAction__btn").addEventListener("click", () => {
                        handleOpenChatbot();
                    })
                }

                if(document.querySelector(".fQChatbotBtn")) {
                    document.querySelector(".fQChatbotBtn").addEventListener("click", () => {
                        handleOpenChatbot();
                    })
                }
            }
        })
    } else {
        console.log("Not logged")
        if (openChatbotBtn) {
            openChatbotBtn.classList.add("hidden")
        }

        if (document.querySelector(".callToAction__btn")) {
            document.querySelector(".callToAction__btn").addEventListener("click", () => {
                location.href = "login.html";
            })
        }

        if(document.querySelector(".fQChatbotBtn")) {
            document.querySelector(".fQChatbotBtn").addEventListener("click", () => {
                location.href = "login.html";
            })
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
            /*{
                id: 0,
                type: "bot",
                text: `??Hola! Soy Alfonso Bot. ${userInfo.sex === "female" ? "Bienvenida" : "Bienvenido"} <strong>${userInfo.name}</strong>,
                dime en qu?? te puedo ayudar.<br>
                <strong>Elige el tema que desees obtener informaci??n:<strong>`,
                itemList: chatBotOptionsList,
                date: Date.now(),
                hour: getMessageHour()
            }*/
            //{chatbotGenderMessage, type: "bot", id: 0, date: Date.now(), hour: getMessageHour()}
            { id: 0, date: Date.now(), hour: getMessageHour(), type: "bot", ...chatbotGenderMessage }
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