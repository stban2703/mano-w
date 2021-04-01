const chatbot = document.querySelector(".chatbot");
const chatbotChat = document.querySelector(".chatbot__chat");
const openChatbotBtn = document.querySelector(".chatbot__openBtn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");
const chabotMessageForm = document.querySelector(".chatbot__footer")

let date = new Date();
let hour = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`

let initialMessageList = [
    {
        text: "Dime en qué te puedo ayudar",
        type: "asesor",
        date: Date.now(),
        hour: hour
    },
    {
        type: "bot",
        title: "Elige el tema del que desees obtener información",
        itemList: chatBotOptionsList,
        date: Date.now(),
        hour: hour
    }
]

let dbMessageList = [];

function getDbMessages() {
    dbMessageList = [];
    userMessagesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dbMessageList.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        initialMessageList.forEach(elem => {
            dbMessageList.push(elem);
        })
        renderChatMessages(dbMessageList);
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

//renderChatMessages(messageList);

function renderChatMessages(list) {
    if (document.querySelector(".message")) {
        cleanRender();
    }
    const listCopy = [...list].sort((a, b) => {
        return b.date - a.date;
    });

    console.log(listCopy)

    const listReverse = [...listCopy].reverse();

    listReverse.forEach((elem) => {
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
                itemList.forEach((elem) => {
                    const newTopic = handleCreateTopicElement(elem);
                    newTopicList.appendChild(newTopic);
                })

                newMessage.appendChild(newTopicList);
                //renderChatbotTopics(newTopicList, elem.optionsList);
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
        chatbotChat.appendChild(newMessage);
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
        if (elem.itemList) {
            handleClickOptions(elem);
        } else {
            window.location.href = elem.redirectUrl;
        }
    })
    return newItem;
}

function handleClickOptions(elem) {
    let date = new Date();
    let hour = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
    const newMessage = {
        text: elem.value,
        type: "user",
        date: date,
        hour: hour,
        selectedOption: elem
    }
    //list.push(newMessage);
    handleSendMessageFirestore(newMessage);
    //messageList = list;
    //renderChatMessages(messageList);
    handleLastUserMessage(newMessage);
}

function handleLastUserMessage(message) {
    if (message.type === "user" && message.selectedOption) {
        const newBotmessage = {
            type: "bot",
            title: "Elige el tema del que desees obtener información",
            itemList: message.selectedOption.itemList
        }
        handleSendMessageFirestore(newBotmessage);
        setTimeout(() => {
            //messageList.push(newBotmessage);
            //renderChatMessages(messageList)
            getDbMessages();
        }, 2000)
    }
}

chabotMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let messageText = chabotMessageForm.userMessage.value;
    handleAddMessagesInList(messageText, "user");
    chabotMessageForm.userMessage.value = "";
})


function handleSendMessageFirestore(message) {
    userMessagesRef.add(message).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        getDbMessages();
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });;
}

function handleAddMessagesInList(message, type) {
    let date = new Date();
    let hour = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`

    var newObj = {
        text: message,
        type: type,
        date: Date.now(),
        hour: hour
    }
   // messageList.push(newObj);
    handleSendMessageFirestore(newObj);
    //renderChatMessages(messageList);
    handleLastUserMessage(newObj)
}

function handleSendMessageChatbot() {
    var messageElem = document.querySelector(".chatbot__textBox");
    handleAddMessagesInList(messageElem.value, "user");
    messageElem.value = "";
}

function cleanRender() {
    var messageElem = document.querySelector(".chatbot__chat");
    messageElem.innerHTML = "";
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