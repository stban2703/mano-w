const chatbot = document.querySelector(".chatbot");
const chatbotMessages = document.querySelector(".chatbot__messages");
const openChatbotBtn = document.querySelector(".chatbot__openBtn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");
const chabotMessageForm = document.querySelector(".chatbot__footer")

let localMessageList = [
    {
        id: 0,
        text: "Dime en qué te puedo ayudar",
        type: "asesor",
        date: Date.now(),
        hour: getMessageHour()
    },
    {
        id: 1,
        type: "bot",
        title: "Elige el tema del que desees obtener información",
        itemList: chatBotOptionsList,
        date: Date.now(),
        hour: getMessageHour() + 1
    }
]

let dbMessageList = [];
let isChatOnline = false;

function getMessages(isOnline) {
    if (isOnline) {
        userMessagesRef.onSnapshot((querySnapshot) => {
            dbMessageList = [];
            querySnapshot.forEach((doc) => {
                const object = doc.data();
                dbMessageList.push(object);
            });
            //console.log(doc.id, " => ", doc.data());
            cleanRender("online");
            renderChatMessages(dbMessageList, true);
        });
    } else {
        localMessageListCopy = [...localMessageList];
        cleanRender("local");
        renderChatMessages(localMessageListCopy, false);
    }
}

//renderChatMessages(messageList);

function renderChatMessages(list, isOnline) {
    const listCopy = [...list].sort((a, b) => {
        return a.date - b.date;
    });

    const listReverse = [...listCopy].reverse();
    handleCreateMessageElem(listCopy, isOnline);
    const chatbotScroll = document.querySelector(".chatbot__messages");
    chatbotScroll.scrollTop = chatbotScroll.scrollHeight;
}

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
                <p class="message__title">${elem.title}</p>
                `
                const itemList = elem.itemList;

                if (itemList) {
                    itemList.forEach((elem) => {
                        const newTopic = handleCreateTopicElement(elem);
                        newTopicList.appendChild(newTopic);
                    })
                }
                newMessage.appendChild(newTopicList);
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

function handleClickOptions(elem) {
    const newMessage = {
        text: elem.value,
        type: "user",
        date: Date.now(),
        hour: getMessageHour(),
        selectedOption: elem,
        //isFinal: elem.isFinal
    }
    console.log(elem.value)
    localMessageList.push(newMessage);
    getMessages(false);
    //handleSendMessageFirestore(newMessage);
    handleLastUserMessage(newMessage, elem);
}

function handleLastUserMessage(message, elem) {
    let newMessage;
    if (message.type === "user" && elem.itemList) {
        newMessage = {
            type: "bot",
            title: "Elige el tema del que desees obtener información",
            itemList: message.selectedOption.itemList
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
    //handleSendMessageFirestore(newBotmessage);
    setTimeout(() => {

        localMessageList.push(newMessage);
        getMessages(false);

        if (elem.isFinal) {
            isChatOnline = true;
            handleSendMessageFirestore({
                title: `Ahora están conectados`,
                type: "bot",
                date: Date.now(),
                hour: getMessageHour()
            })
        }

        //getDbMessages();
    }, 2000)
}

chabotMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let messageText = chabotMessageForm.userMessage.value;
    handleAddMessagesInList(messageText, "user", isChatOnline);
    chabotMessageForm.userMessage.value = "";
})


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
    //handleSendMessageFirestore(newObj);
    //renderChatMessages(messageList);
    //handleLastUserMessage(newObj)
}

function handleSendMessageChatbot() {
    let messageElem = document.querySelector(".chatbot__textBox");
    handleAddMessagesInList(messageElem.value, "user");
    messageElem.value = "";
}

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

function getMessageHour() {
    let date = new Date();
    let hour = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
    return hour;
}

// Abrir / cerra bot
function handleOpenChatbot() {
    chatbot.classList.remove("hidden");
}

function handleCloseChatbot() {
    chatbot.classList.add("hidden");
}

openChatbotBtn.addEventListener('click', function (event) {
    event.preventDefault();
    handleOpenChatbot();
})

closeChatbotBtn.addEventListener('click', function (event) {
    event.preventDefault();
    handleCloseChatbot();
})