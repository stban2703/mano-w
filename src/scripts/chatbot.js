const chatbot = document.querySelector(".chatbot");
const chatbotMessages = document.querySelector(".chatbot__messages");
const openChatbotBtn = document.querySelector(".chatbotOpen__btn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");
const chabotMessageForm = document.querySelector(".chatbot__footer");

// Lista de mensajes de firestore
let dbMessageList = [];

// Variable para saber si esta chateando online con un asesor
let isChatOnline = false;

// Lista de mensajes locales
let localMessageList = [
    {
        id: 0,
        type: "bot",
        text: "Dime en qué te puedo ayudar. Elige el tema del que desees obtener información",
        itemList: chatBotOptionsList,
        date: Date.now(),
        hour: getMessageHour()
    }
];

// Enviar mensaje del input al chatbot
chabotMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let messageText = chabotMessageForm.userMessage.value;
    handleAddMessagesInList(messageText, "user", isChatOnline);
    chabotMessageForm.userMessage.value = "";
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
            renderChatMessages(dbMessageList, true);
        });
    } else {
        // Cargar mensajes locales
        localMessageListCopy = [...localMessageList];
        cleanRender("local");
        renderChatMessages(localMessageListCopy, false);
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
    list.forEach((elem) => {
        // Crear elemento div para el mensaje
        const newMessage = document.createElement("div");
        newMessage.classList.add("message");

        // Verifica el tipo de mensaje
        switch (elem.type) {
            case "bot":
                newMessage.classList.add("message--topics");
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
                newMessage.classList.add("message--mine");
                newMessage.innerHTML = `
                <p class="message__text">${elem.text}</p>
                <p class="message__hour">${elem.hour}</p>
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

// Controlar el chatbot dependiendo del ultimo mensaje del usuario
function handleLastUserMessage(message, elem) {
    let newMessage;
    if (message.type === "user" && elem.itemList) {
        newMessage = {
            type: "bot",
            text: "Elige el tema del que desees obtener información",
            itemList: message.selectedOption.itemList,
            date: Date.now(),
            hour: getMessageHour()
        }
    } else if (message.type === "user" && elem.isFinal) {
        newMessage = {
            id: localMessageList.length,
            text: "Te contactaré con un asesor, dame unos segundos...",
            type: "asesor",
            date: Date.now(),
            hour: getMessageHour()
        }
    } else if (message.type === "user" && elem.redirectUrl) {
        newMessage = {
            id: localMessageList.length,
            text: `Por favor, haz click <a href="${elem.redirectUrl}">aquí</a> para obtener información`,
            type: "asesor",
            date: Date.now(),
            hour: getMessageHour()
        }
    }
    // Dar un tiempo al chatbot para enviar el mensaje
    setTimeout(() => {
        localMessageList.push(newMessage);
        getMessages(false);

        if (elem.isFinal) {
            isChatOnline = true;
            handleSendMessageFirestore({
                text: `Ahora están conectados`,
                type: "bot",
                date: Date.now(),
                hour: getMessageHour()
            })
        }
    }, 1500);
}

// Enivar mensaje a firestore y recuperarlos
function handleSendMessageFirestore(message) {
    const newMessage = message;
    newMessage.id = dbMessageList.length;
    userMessagesRef.add(newMessage).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
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
