let urlID = location.search.replace("?", "");
console.log(urlID);

getEventData(urlID);

function getEventData(id) {
    let docRef = eventRef.doc(id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            let event = doc.data();
            renderEventInfo(event);
        } else {
            alert("Este evento no existe o ya no está disponible.");
        }
    }).catch((error) => {
        alert("Error getting document:", error);
    });
}

function getFormattedTopic(topic) {
    switch(topic) {
        case "motivacion":
            return "Motivación"

        case "creditos":
            return "Créditos"

        default:
            return capitalizeFirstLetter(topic);
    }
}

function renderEventInfo(event) {
    let formattedTopic = getFormattedTopic(event.topic);
    const specificEventContainer = document.querySelector(".specificEvent");
    specificEventContainer.innerHTML = `
        <section class="introBanner introBanner--blue">
            <h2>Eventos</h2>
        </section>
        <article class="specificEvent__banner" style="background-image: url('./src/images/${event.bannerUrlImage}.jpg');">
            <div class="specificEvent__bannerFilter ${event.tag === "Conferencia" ? 'specificEvent__bannerFilter--orange' : 'specificEvent__bannerFilter--purple'}">

            </div>
            <h2 class="specificEvent__title">${event.title}</h2>
            <h3 class="specificEvent__tag">${event.tag === "Capacitacion" ? "Capacitación" : event.tag}</h3>
        </article>
        <article class="specificEvent__info">
            <article class="specificEvent__infoContainer">
                <h4 class="specificEvent__infoTitle">Resumen</h4>
                <section class="specificEvent__eventInfo">
                    <section class="specificEvent__eventDetails">
                        <section class="specificEvent__microInfo">
                            <div class="eventMicroInfo">
                                <div class="eventMicroInfo__icon">
                                    <img src="./src/images/location.svg" alt="">
                                </div>
                                <span class="eventMicroInfo__title">Virtual</span>
                            </div>
                            <div class="eventMicroInfo">
                                <div class="eventMicroInfo__icon">
                                    <img src="./src/images/calendar.svg" alt="">
                                </div>
                                <span class="eventMicroInfo__title">${getTimestampToFullDate(event.date)}</span>
                            </div>
                            <div class="eventMicroInfo">
                                <div class="eventMicroInfo__icon">
                                    <img src="./src/images/clock.svg" alt="">
                                </div>
                                <span class="eventMicroInfo__title">${getFormattedTime(event.time)} (Hora de Colombia)</span>
                            </div>
                        </section>
                        <section class="specificEvent__topicSection">
                            <h4>Tema</h4>
                            <p class="specificEvent__topic ${event.tag === "Conferencia" ? 'specificEvent__topic--orange' : 'specificEvent__topic--purple'}">${formattedTopic}</p>
                        </section>
                        <button class="btn ${event.tag === "Conferencia" ? 'btn--purple' : ''}">Registrarse</button>
                    </section>
                    <section class="specificEvent__eventSummaryInfo">
                        <div class="specificEvent__eventSummary">
                            <p>
                                ${event.eventSummary}
                            </p>
                        </div>
                    </section>
                </section>
            </article>
        </article>
        <article class="specificEvent__info">
            <article class="specificEvent__infoContainer">
                <h4 class="specificEvent__infoTitle">Exponente</h4>
                <section class="specificEvent__eventInfo">
                    <div class="speaker ${event.tag === "Conferencia" ? 'speaker--orange' :'speaker--purple'}">
                        <section class="speaker__iconSection">
                            <img src="./src/images/${event.speakerUrlImage}.png" alt="">
                            <h3 class="speaker__name">${event.speaker}</h3>
                            <h4 class="speaker__age">${event.age} años</h4>
                        </section>
                        <section class="speaker__summarySection">
                            <p>
                                ${event.speakerSummary}
                            </p>
                        </section>
                    </div>
                </section>
                <section class="specificEvent__eventInfo">
                    <div class="specificEvent__organizerSection ${event.tag === "Conferencia" ? 'specificEvent__organizerSection--orange' : 'specificEvent__organizerSection--purple'}">
                        <h4>Organizador del evento</h4>
                        <p>${event.organizer}</p>
                    </div>
                </section>
            </article>
        </article>
    `
}