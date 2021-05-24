

function getEventData(ID) {
    // Obtener los mensajes de firestore
    console.log(ID);
    var docRef = db.collection("events").doc(`${ID}`);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setEventInfo(doc.data())
        } else {
            // doc.data() will be undefined in this case
            alert("No such document!");
        }
    }).catch((error) => {
        alert("Error getting document:", error);
    });
}

var urlID = location.search.replace("?", "").split("-");
console.log(urlID);
var eventInfo = getEventData(urlID);

console.log(document.querySelector(".introduction"));
console.log(eventInfo);

function setEventInfo(eventInfo) {
    document.querySelector(".introduction").innerHTML = 
`<section class="specificEvent__introduction">
    <h2>Eventos</h2>
</section>
<section class="specificEvent__backgroundImg">
    <img src="./src/images/${eventInfo.bannerUrlImage}.jpg" alt="">
    <div class="specificEvent__backgroundImg__imgFilter"></div>
    <div class="specificEvent__backgroundImg__text">
        <p class="specificEvent__backgroundImg__mainText">${capitalizeFirstLetter(eventInfo.title)}</p>
        <p class="specificEvent__backgroundImg__subText">${capitalizeFirstLetter(eventInfo.tag)}</p>
    </div>
</section>
<section class="specificEvent__mainEvent">
    <h2>Resumen</h2>
    <div class="specificEvent__mainEvent__shortInfo">
        <div class="specificEvent__mainEvent__shortInfo__section">
            <div class="specificEvent__mainEvent__shortInfo__info">
                <img src="./src/images/location.svg" alt="">
                <span class="specificEvent__mainEvent__shortInfo__value">Virtual</span>
            </div>
            <div class="specificEvent__mainEvent__shortInfo__info">
                <img src="./src/images/calendar.svg" alt="">
                <span class="specificEvent__mainEvent__shortInfo__value">${getTimestampToDate(eventInfo.date)}</span>
            </div>
            <div class="specificEvent__mainEvent__shortInfo__info">
                <img src="./src/images/location.svg" alt="">
                <span class="specificEvent__mainEvent__shortInfo__value">${eventInfo.time} (Hora Colombia)</span>
            </div>
            <div class="specificEvent__mainEvent__theme">
                <span><strong>Tema:</strong></span>
                <span class="specificEvent__mainEvent__theme--value">${capitalizeFirstLetter(eventInfo.topic)}</span>
            </div>
            <button class="btn specificEvent__mainEvent__register">Registrarse</button>
        </div>
    </div>
    <div class="specificEvent__mainEvent__longInfo">
        <div class="specificEvent__mainEvent__shortInfo__section">
            <p>${capitalizeFirstLetter(eventInfo.eventSummary) }</p>
        </div>
    </div>
</section>
<section class="specificEvent__exponent">
    <h2>Exponente</h2>
    <div class="specificEvent__exponent__container">
        <div class="specificEvent__exponent__container__info">
            <img src="./src/images/${eventInfo.speakerUrlImage}.png" alt="">
            <span class="specificEvent__exponent__container__info--name">${eventInfo.speaker}</span>
            <span class="specificEvent__exponent__container__info--age">${eventInfo.age} años</span>
        </div>
        <p class="specificEvent__exponent__container__data">${capitalizeFirstLetter(eventInfo.speakerSummary)}
        </p>
    </div>
</section>
<div class="specificEvent__organizer">
<span><strong>Organizador del evento:</strong></span>
<span class="specificEvent__organizer--value">${capitalizeFirstLetter(eventInfo.organizer)}</span>
</div>
<section class="specificEvent__form__container">
    <form class="specificEvent__form__form">

        <h2>Registro del evento</h2>
        
        <div class="input overlay">
            <label for="identification">Nombre</label>
            <input class="input__textBox" name="identification" type="text" placeholder="Escribe tu mombre" required>
        </div>

        <div class="input overlay">
            <label for="password">Apellidos</label>
            <input class="input__textBox" name="password" type="password" placeholder="Escribe tus apellidos" required>
        </div>

        <div class="input overlay">
            <label for="password">Celular</label>
            <input class="input__textBox" name="password" type="password" placeholder="Escribe tu número celular" required>
        </div>

        <button class="btn overlay">Registrarse</button>
    </form>
    <section class="specificEvent__form__character">
        <h1 class="specificEvent__form__title">Iniciar sesión</h1>
        <img class="specificEvent__form__image" src="./src/images/eventForm.svg">
    </section>
</section>
`
}

