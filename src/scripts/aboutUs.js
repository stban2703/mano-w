const aboutUsItems = document.querySelectorAll(".aboutUsItem");
const aboutUsItemText = document.querySelector(".aboutUs__itemText");
const aboutUsDescList = [
    "Es un chatbot que combina la inteligencia artificial con el asesor físico para brindar un servicio de atención eficaz. El cual mantiene un acompañamiento constante, facilita la enseñanza de los medios digitales y proporciona información financiera y de los productos ofrecidos por el banco. De esta forma, si el cliente siente que el chatbot le proporcionó información insuficiente o necesita ayuda en una situación específica, el sistema lo redirigirá automáticamente con un asesor que ayudará y resolverá todas las dudas de una forma personalizada.",
    "Así mismo, en Mano W podrás seleccionar los temas de tu interés y dependiendo te tu selección nosotros te recomendaremos alguna charla o capacitación acerca de estos para que no te pierdas de ninguna, y puedas asistir y aprender de estos eventos que te ayudarán a seguir creciendo junto con tu negocio.",
    "Finalmente, Mano W cuenta con un tablero de sueños en donde los usuarios puedan colocar sus metas de ahorro y clasificarlas según su estado de progreso."
];

let currentAboutUsItem = 0;
handleAboutUsItem();

aboutUsItems.forEach((elem, i) => {
    elem.addEventListener("click", () => {
        currentAboutUsItem = i;
        handleAboutUsItem();
    });
});

function handleAboutUsItem() {
    aboutUsItems.forEach((elem, i) => {
        if(i === currentAboutUsItem) {
            elem.classList.add("aboutUsItem--selected");
            aboutUsItemText.innerText = aboutUsDescList[i];
        } else {
            elem.classList.remove("aboutUsItem--selected");
        }
    })
}
