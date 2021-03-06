const chatbot = document.querySelector(".chatbot");
const chatbotMessages = document.querySelector(".chatbot__messages");
const chatbotButtonOpen = document.querySelector('.floatButton');
const openChatbotBtn = document.querySelector(".floatButton__btn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");
const chabotMessageForm = document.querySelector(".chatbot__footer");
const chatbotNotification = document.querySelector(".floatButton__notification");
const chatbotTextBox = document.querySelector(".chatbot__textBox");
const chatbotTyping = document.querySelector(".chatbot__typing");
const chatbotTitle = document.querySelector(".chatbot__title");
const chatbotProfileImage = document.querySelector(".chatbot__profilePicImg");

// Esconder notificacion
hideChatbotNotification();

// Lista de mensajes de firestore
let dbMessageList = [];

// Variable para saber si esta chateando online con un asesor
let isChatOnline = false;

// Enviar mensaje con enter
chatbotTextBox.addEventListener("keypress", (event)=> {
    if(event.key == "Enter") {
        event.preventDefault();
        handleSubmitMessage();
    }
})

chatbotTextBox.addEventListener("input", function () {
    chatbotTextBox.style.height = "1px";
    chatbotTextBox.style.height = (chatbotTextBox.scrollHeight) + "px";
})

// Enviar mensaje del input al chatbot
chabotMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSubmitMessage();
})

// Abrir y cerrar chatbot
openChatbotBtn.addEventListener('click', function (event) {
    event.preventDefault();
    handleOpenChatbot();
})

closeChatbotBtn.addEventListener('click', function (event) {
    event.preventDefault();
    handleCloseChatbot();
})

// Abrir u ocultar notificacion cuando el mouse entra o sale
chatbotButtonOpen.addEventListener('mouseenter', handleOpenMessageAddClass);
chatbotButtonOpen.addEventListener('mouseleave', handleOpenMessageRemoveClass);

function handleSubmitMessage() {
    chatbotTextBox.style.height = "100%";
    let messageText = chabotMessageForm.userMessage.value;
    handleAddMessagesInList(messageText, "user", isChatOnline);
    chabotMessageForm.userMessage.value = "";
}

function getMessages(isOnline) {
    // Obtener los mensajes de firestore
    if (isOnline) {
        userMessagesRef.onSnapshot((querySnapshot) => {
            dbMessageList = [];
            querySnapshot.forEach((doc) => {
                const object = doc.data();
                dbMessageList.push(object);
            });
            cleanRender("online");
            renderChatMessages(dbMessageList, isOnline);
        });
    } else {
        // Cargar mensajes locales
        localMessageListCopy = [...localMessageList];
        cleanRender("local");
        renderChatMessages(localMessageListCopy, isOnline);
    }
}

// Renderizar lista de mensajes
function renderChatMessages(list, isOnline) {
    // Ordenar lista por fecha
    const listCopy = [...list].sort((a, b) => {
        return a.date - b.date;
    });
    // Create el elemento hmtl para mensaje
    handleCreateMessageElem(listCopy, isOnline);
    // Ajustar scroll del chatbot
    const chatbotScroll = document.querySelector(".chatbot__messages");
    chatbotScroll.scrollTop = chatbotScroll.scrollHeight;
}

// Crear elemento mensaje
function handleCreateMessageElem(list, isOnline) {
    var finalItem = 0;
    list.forEach((elem) => {
        finalItem++;
        // Crear elemento div para el mensaje
        const newMessage = document.createElement("div");
        newMessage.classList.add("message");

        // Verifica el tipo de mensaje
        switch (elem.type) {
            case "bot":
                newMessage.classList.add("message--topics");
                if (finalItem == list.length) {
                    newMessage.classList.add("message--anim--bot");
                    setTimeout(() => {
                        newMessage.classList.remove("message--anim--bot");
                    }, 100);
                }
                const newTopicList = document.createElement("ul");
                newTopicList.classList.add("message__topicsList");
                newMessage.innerHTML = `
                <p class="message__text">${elem.text}</p>
                `
                const itemList = elem.itemList;

                if (itemList) {
                    itemList.forEach((elem) => {
                        const newTopic = handleCreateTopicElement(elem);
                        newTopicList.appendChild(newTopic);
                    })
                }
                newMessage.appendChild(newTopicList);
                const newMessageHour = document.createElement("p")
                newMessageHour.innerHTML = `<p class="message__hour">${elem.hour}</p>`
                newMessage.appendChild(newMessageHour);
                break;
            case "user":
                newMessage.classList.add("message--user");
                if (finalItem == list.length) {
                    newMessage.classList.add("message--anim--user");
                    setTimeout(() => {
                        newMessage.classList.remove("message--anim--user");
                    }, 100);
                }
                newMessage.innerHTML = `
                <p class="message__text">${elem.text}</p>
                <p class="message__hour">${elem.hour}</p>
            `
                break;
            case "advise":
                newMessage.innerHTML = `
                <p class="message__advise">${elem.text}</p>
            `
                break;
            default:
                newMessage.innerHTML = `
                <p class="message__text">${elem.text}</p>
                <p class="message__hour">${elem.hour}</p>
            `
                break;
        }

        if (isOnline) {
            const chabotOnlineMessages = document.querySelector(".chatbot__onlineMessages")
            chabotOnlineMessages.appendChild(newMessage);
        } else {
            const chabotLocalMessages = document.querySelector(".chatbot__localMessages")
            chabotLocalMessages.appendChild(newMessage);
        }
    })
}

// Crear temas del chatbot
function handleCreateTopicElement(elem) {
    const newItem = document.createElement("li");
    newItem.classList.add("message__item");
    newItem.innerHTML = `
            <img src=${elem.imageUrl} alt="">
            <p>${elem.value}</p>
        `
    newItem.addEventListener('click', function () {
        handleClickOptions(elem);
    })
    return newItem;
}

// Controlar el click en los temas del chatbot
function handleClickOptions(elem) {
    if (!isChatOnline) {
        const newMessage = {
            text: elem.value,
            type: "user",
            date: Date.now(),
            hour: getMessageHour(),
            selectedOption: elem
        }
        localMessageList.push(newMessage);
        getMessages(false);
        handleLastUserMessage(newMessage, elem);
    }
}

// Controlar el chatbot dependiendo del ultimo mensaje del usuario
function handleLastUserMessage(message, elem) {
    let newMessage;

    if (elem.gender) {
        newMessage = {
            id: 0,
            type: "bot",
            text: `??Hola! Soy ${elem.value}. ${userInfo.sex === "female" ? "Bienvenida" : "Bienvenido"} <strong>${userInfo.name}</strong>,
            dime en qu?? te puedo ayudar.<br>
            <strong>Elige el tema que desees obtener informaci??n:<strong>`,
            itemList: chatBotOptionsList,
            date: Date.now(),
            hour: getMessageHour()
        }

        setTimeout(() => {
            chatbotProfileImage.classList.remove("invisible");
            chatbotProfileImage.src = elem.imageUrl;
            chatbotTitle.innerText = elem.value;
            localMessageList.push(newMessage);
            chatbotTyping.classList.add("invisible");
            getMessages(false);
        }, 1500);

    } else {
        if (message.type === "user") {

            if (elem.itemList) {
                newMessage = {
                    type: "bot",
                    text: elem.text,
                    itemList: message.selectedOption.itemList,
                    date: Date.now(),
                    hour: getMessageHour()
                }

            } else if (elem.isFinal) {
                newMessage = {
                    id: localMessageList.length,
                    text: "Te contactar?? con un asesor, dame unos segundos...",
                    type: "asesor",
                    date: Date.now(),
                    hour: getMessageHour()
                }

            } else if (elem.redirectUrl) {
                newMessage = {
                    id: localMessageList.length,
                    text: `Por favor, haz click <a href="${elem.redirectUrl}" target="_blank">aqu??</a> para obtener informaci??n.`,
                    type: "asesor",
                    date: Date.now(),
                    hour: getMessageHour()
                }
            }
            chatbotTyping.classList.remove("invisible");
        }
        // Dar un tiempo al chatbot para enviar el mensaje
        setTimeout(() => {
            localMessageList.push(newMessage);
            chatbotTyping.classList.add("invisible");
            getMessages(false);

            if (elem.isFinal) {
                isChatOnline = true;
                chatbotTitle.innerText = "Asesor Esteban"
                chatbotProfileImage.src = "./src/images/chatbotprofilepicture.svg";
                handleSendMessageFirestore({
                    text: `Ahora est??n conectados`,
                    type: "advise",
                    date: Date.now(),
                    hour: getMessageHour()
                })
            }
        }, 1500);
    }
}

// Enivar mensaje a firestore y recuperarlos
function handleSendMessageFirestore(message) {
    const newMessage = message;
    newMessage.id = dbMessageList.length;
    userMessagesRef.add(newMessage).then((docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        getMessages(isChatOnline);
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });;
}

// Agregar mensaje a la lista local o a la lista online si NO son del bot
function handleAddMessagesInList(message, type, isOnline) {
    const newMessage = {
        text: message,
        type: type,
        date: Date.now(),
        hour: getMessageHour()
    }
    if (isOnline) {
        handleSendMessageFirestore(newMessage);
        getMessages(isChatOnline);
    } else {
        localMessageList.push(newMessage);
        getMessages(isOnline);
    }
}

// Funcion para enviar mensahe al chatbot
function handleSendMessageChatbot() {
    let messageElem = document.querySelector(".chatbot__textBox");
    handleAddMessagesInList(messageElem.value, "user");
    messageElem.value = "";
}

// Limpiar mensajes locales u online
function cleanRender(type) {
    const localMessages = document.querySelector(".chatbot__localMessages");
    const onlineMessages = document.querySelector(".chatbot__onlineMessages")
    switch (type) {
        case "local":
            localMessages.innerHTML = "";
            break;
        case "online":
            onlineMessages.innerHTML = "";
            break;
    }
}

// Funcion para obtner la fecha de creacion del mensaje
function getMessageHour() {
    let date = new Date();
    let hour = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
    return hour;
}

// Funciones para Abrir / cerrar bot
function handleOpenChatbot() {
    chatbot.classList.remove("hidden");
}

function handleCloseChatbot() {
    chatbot.classList.add("hidden");
}

function hideChatbotNotification() {
    setTimeout(() => {
        chatbotNotification.classList.add("floatButton__notification--hidden");
    }, 4500);
}

function handleOpenMessageRemoveClass() {
    chatbotNotification.classList.add('floatButton__notification--hidden');
}

function handleOpenMessageAddClass() {
    chatbotNotification.classList.remove('floatButton__notification--hidden');
}