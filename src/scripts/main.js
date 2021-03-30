const chatbot = document.querySelector(".chatbot");
const openChatbotBtn = document.querySelector(".chatbot__openBtn");
const closeChatbotBtn = document.querySelector(".chatbot__closeBtn");

function handleOpenChatbot() {
    chatbot.classList.remove("hidden");
}

function handleCloseChatbot() {
    chatbot.classList.add("hidden");
}

openChatbotBtn.addEventListener('click', function(event) {
    event.preventDefault();
    handleOpenChatbot();
})

closeChatbotBtn.addEventListener('click', function(event) {
    event.preventDefault();
    handleCloseChatbot();
})