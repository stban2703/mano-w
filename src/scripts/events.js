const recentSection = document.querySelector(".events__content--recent");
const conferenceSection = document.querySelector(".events__content--conference");
const trainingSection = document.querySelector(".events__content--training");

let eventsList = [];
getEvents();

function getEvents() {
    eventRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let eventObject = doc.data();
                eventObject.id = doc.id;
                eventsList.push(eventObject);
            });
            eventsList.sort((a, b) => {
                return a.date - b.date;
            });
            renderRecentEvents(eventsList);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

function renderRecentEvents(list) {
    recentSection.innerHTML = "";
    let copy = [...list];
    copy = copy.splice(0, 3);
    copy.forEach(elem => {
        const eventItem = getEventItem(elem);
        recentSection.appendChild(eventItem);
    })
}

function getEventItem(elem) {
    const eventItem = document.createElement("div");
    eventItem.classList.add("eventItem");
    if (elem.tag === "Conferencia") {
        eventItem.classList.add("eventItem--orange");
    } else {
        eventItem.classList.add("eventItem--purple");
    }
    eventItem.innerHTML =
        `
        <section class="eventItem__header">
            <p>${elem.title}</p>
        </section>
        <section class="eventItem__section">
            <div class="eventItem__photo">
                <img src="./src/images/${elem.speakerUrlImage}.png" alt="">
            </div>
            <div class="eventItem__info">
                <p class="eventItem__author">${elem.speaker}</p>
                <p class="eventItem__date">${getTimestampToDate(elem.date)}</p>
            </div>
            <button class="btn ${elem.tag === "Conferencia" ? "" : "btn--purple"}">Conoce más</button>
        </section>
        `
    return eventItem;
}