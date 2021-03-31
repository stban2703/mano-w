const chatbot = document.querySelector(".chatbot");
const chatbotChat = document.querySelector(".chatbot__chat");
const openChatbotBtn = document.querySelector(".chatbot__openBtn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");

const initialMessageList = [
    {
        id: 0,
        text: "Dime en qué te puedo ayudar",
        type: "asesor",
    },
    {
        id: 1,
        type: "bot",
        title: "Elige el tema del que desees obtener información",
        itemList: chatBotOptionsList
    }
]

renderChatMessages(initialMessageList);

function renderChatMessages(list) {
    if (document.querySelector(".message")) {
        cleanRender();
    }
    const listCopy = [...list];
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
                    const newTopic = handleCreateTopicElement(elem, listCopy);
                    newTopicList.appendChild(newTopic);
                })

                newMessage.appendChild(newTopicList);
                //renderChatbotTopics(newTopicList, elem.optionsList);
                break;
            case "user":
                newMessage.classList.add("message--mine");
                newMessage.innerHTML = `
                    <p class="message__text">${elem.text}</p>
                    <p class="message__hour">15:10</p>
                `
                break;
            default:
                newMessage.innerHTML = `
                    <p class="message__text">${elem.text}</p>
                    <p class="message__hour">15:10</p>
                `
                break;
        }
        chatbotChat.appendChild(newMessage);
    })
}

function handleCreateTopicElement(elem, messageList) {
    const newItem = document.createElement("li");
    newItem.classList.add("message__item");

    newItem.innerHTML = `
            <img src=${elem.imageUrl} alt="">
            <p>${elem.value}</p>
        `
    newItem.addEventListener('click', function () {
        if (elem.itemList) {
            handleClickOptions(elem, messageList);
        } else {
            window.location.href = elem.redirectUrl;
        }
    })
    return newItem;
}

function handleClickOptions(elem, messageList) {
    const newMessage = {
        id: messageList.length,
        text: elem.value,
        type: "user",
        selectedOption: elem
    }
    messageList.push(newMessage);
    renderChatMessages(messageList);
    handleLastUserMessage(newMessage, messageList);
}

function handleLastUserMessage(message, messageList) {
    if (message.type === "user" && message.selectedOption) {
        const newBotmessage = {
            id: messageList.length,
            type: "bot",
            title: "Elige el tema del que desees obtener información",
            itemList: message.selectedOption.itemList
        }

        setTimeout(() => {
            messageList.push(newBotmessage);
            renderChatMessages(messageList)
        }, 2000)
    }
}

// Retirada por el momento
/*function renderChatbotTopics(htmlElement, list) {
    //const chatbotTopicList = document.querySelector(".message__topicsList");
    if (document.querySelector(".message--topics")) {
        cleanRender();
    }
    list.forEach((elem) => {
        const newItem = document.createElement("li");
        newItem.classList.add("message__item");

        newItem.innerHTML = `
            <img src=${elem.imageUrl} alt="">
            <p>${elem.value}</p>
        `
        htmlElement.appendChild(newItem);
        newItem.addEventListener('click', function () {
            if (elem.itemList) {
                handleChatbotNextOptions(elem);
            } else {
                window.location.href = elem.redirectUrl;
            }
        })
    })
}*/


// Mensajes nuevos
// Lo de enviar un mensaje y que se haga push en el arreglo de messageList
function handleAddMessagesInList(message, type) {
    var newObj = {
        id: messageList.length,
        text: message,
        type: type
    }
    messageList.push(newObj);
    console.log(messageList);
    renderChatMessages(messageList);
}

function handleSendMessageChatbot() {
    var messageElem = document.querySelector(".chatbot__textBox");
    handleAddMessagesInList(messageElem.value, "user"); //Aqui pues creo que tiene sentido que siempre sea de tipo usuario porque el evento es al darle click en el botón de enviar, para los mensajes del asesor pues solo es cambiar "user" por "asesor" pero eso creo que no se hace por aca o no sé bien la verdad.
    messageElem.value = "";
}
const sendMessageBtn = document.querySelector(".chatbot__sendBtn");
sendMessageBtn.addEventListener('click', handleSendMessageChatbot);
//Hasta aqui lo de enviar mensaje

function cleanRender() {
    var messageElem = document.querySelector(".chatbot__chat");
    messageElem.innerHTML = "";
} //Esta función basicamente es para que elimine todos los mensajes antes de volver a renderizar todo, la ejecuto al inicio de renderChatMessages y con esos if para que comience a usar la función a partir de la segunda renderización y no desde la primera. Y pues lo mismo en renderChatbotTopics


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