const chatBotOptionsList = [
    {
        value: "Productos del banco",
        text: "Elige el producto del que desees conocer más:",
        imageUrl: "./src/images/chatbotproducts.svg",
        itemList: [
            {
                value: "CDT",
                imageUrl: "./src/images/chatbotcdt.svg",
                text: "Elige qué quieres conocer de CDT:",
                itemList: [
                    {
                        value: "Información",
                        imageUrl: "./src/images/chatbotinformation.svg",
                        redirectUrl: "https://www.bancow.com.co/inversion/cdt/#3"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotquestionspecific.svg",
                        isFinal: true
                    }
                ]
            },
            {
                value: "Cuenta de ahorros",
                imageUrl: "./src/images/chatbotsavings.svg",
                text: "Elige qué quieres conocer de Cuenta de ahorros:",
                itemList: [
                    {
                        value: "Información",
                        imageUrl: "./src/images/chatbotinformation.svg",
                        redirectUrl: "https://www.bancow.com.co/ahorro/cuenta-de-ahorro-basica/"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotquestionspecific.svg",
                        isFinal: true
                    }
                ]
            },
            {
                value: "Microcréditos",
                imageUrl: "./src/images/chatbotmicrocredits.svg",
                text: "Elige qué quieres conocer de Microcréditos:",
                itemList: [
                    {
                        value: "Información",
                        imageUrl: "./src/images/chatbotinformation.svg",
                        redirectUrl: "https://www.bancow.com.co/credito/microcredito/"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotquestionspecific.svg",
                        isFinal: true
                    }
                ]
            }
        ]
    },
    {
        value: "Preguntas frecuentes",
        imageUrl: "./src/images/chatbotquestions.svg",
        redirectUrl: "frequentQuestions.html"
    },
    {
        value: "Entrenamiento digital",
        imageUrl: "./src/images/chatbotentertaiment.svg",
        text: "Elige la parte de la página que desees aprender a usar",
        itemList: [
            {
                value: "Acceder a eventos",
                imageUrl: "./src/images/chatbotevents.svg",
                text: "Elige que quieres ver de la página:",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotvideo.svg",
                        redirectUrl: "https://youtu.be/RC2Scl8fHtg"
                    },
                    {
                        value: "Ir a eventos",
                        imageUrl: "./src/images/chatbotevents.svg",
                        redirectUrl: "events.html",
                    }
                ]
            },
            {
                value: "Tablero de sueños",
                imageUrl: "./src/images/chatbotdreams.svg",
                text: "Elige que quieres ver de la página:",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotvideo.svg",
                        redirectUrl: "https://youtu.be/uE3ztLQTH3Q"
                    },
                    {
                        value: "Ir al tablero de sueños",
                        imageUrl: "./src/images/chatbotdreams.svg",
                        redirectUrl: "dreamBoard.html",
                    }
                ]
            },
            {
                value: "Uso del chabot",
                imageUrl: "./src/images/chatbotchatbot.svg",
                text: "Elige que quieres ver de la página:",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotvideo.svg",
                        redirectUrl: "https://youtu.be/Gb11fMyrev4.html"
                    }
                ]
            }
        ]
    }
]

const chatbotGenderMessage = {
    id: 0,
    value: "Selecciona el Bot con el que deseas hablar",
    text: "Selecciona el Bot con el que deseas hablar",
    isGenderSelect: true,
    itemList: [
        {
            value: "Alfonso Bot",
            imageUrl: "./src/images/malebot.svg",
            gender: "male"
        },
        {
            value: "Amparo Bot",
            imageUrl: "./src/images/femalebot.svg",
            gender: "female"
        }
    ]
}