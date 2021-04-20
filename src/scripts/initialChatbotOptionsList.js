const chatBotOptionsList = [
    {
        value: "Productos del banco",
        imageUrl: "./src/images/chatbotproducts.svg",
        itemList: [
            {
                value: "CDT",
                imageUrl: "./src/images/chatbotproducts.svg",
                itemList: [
                    {
                        value: "Información",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "https://www.bancow.com.co/inversion/cdt/#3"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        isFinal: true
                    }
                ]
            },
            {
                value: "Cuenta de ahorros",
                imageUrl: "./src/images/chatbotproducts.svg",
                itemList: [
                    {
                        value: "Información",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "productInformation.html"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        isFinal: true
                    }
                ]
            },
            {
                value: "Microcréditos",
                imageUrl: "./src/images/chatbotproducts.svg",
                itemList: [
                    {   
                        value: "Información",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "productInformation.html"
                    },
                    {
                        value: "Duda específica",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        isFinal: true
                    }
                ]
            }
        ]
    },
    {
        value: "Preguntas frecuentes",
        imageUrl: "./src/images/chatbotquestions.svg",
        redirectUrl: "index.html"
    },
    {
        value: "Entrenamiento digital",
        imageUrl: "./src/images/chatbotentertaiment.svg",
        itemList: [
            {
                value: "Acceder a eventos",
                imageUrl: "./src/images/chatbotevents.svg",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "productInformation.html"
                    },
                    {
                        value: "Ir a eventos",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "events.html",
                    }
                ]
            },
            {
                value: "Tablero de sueños",
                imageUrl: "./src/images/chatbotdreams.svg",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "productInformation.html"
                    },
                    {
                        value: "Ir al tablero de sueños",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "dreamBoard.html",
                    }
                ]
            },
            {
                value: "Uso del chabot",
                imageUrl: "./src/images/chatbotchatbot.svg",
                itemList: [
                    {
                        value: "Videos informativos",
                        imageUrl: "./src/images/chatbotproducts.svg",
                        redirectUrl: "productInformation.html"
                    }
                ]
            }
        ]
    }
]