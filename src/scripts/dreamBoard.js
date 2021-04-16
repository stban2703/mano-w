const dreamBoardAddModal = document.querySelector(".dreamBoard__addModal");
const dreamBoardAddBtn = document.querySelector(".dreamBoard__addBtn");
const dreamBoardCloseModalBtn = document.querySelector(".dreamBoard__addClose");
const dreamBoardForm = document.querySelector(".dreamBoard__form");
const dreamUnstartedSection = document.querySelector(".dreamBoard__itemContainer--unstarted");
const dreamInProgressSection = document.querySelector(".dreamBoard__itemContainer--inProgress");
const dreamFinishedSection = document.querySelector(".dreamBoard__itemContainer--finished");

let unstartedDreamsList = [];
let inProgressDreamsList = [];
let finishedDreamsList = [];

dreamBoardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewDream();
});

function getUserDreams() {
    userDreamsRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                let dreamObject = doc.data();
                switch (dreamObject.status) {
                    case "unstarted":
                        unstartedDreamsList.push(dreamObject);
                        break;
                    case "inprogress":
                        inProgressDreamsList.push(dreamObject);
                        break;
                    case "finished":
                        finishedDreamsList.push(dreamObject);
                        break;
                }
            });
            renderDreams(unstartedDreamsList, "unstarted");
            renderDreams(inProgressDreamsList, "inprogress");
            renderDreams(finishedDreamsList, "finished");
        });

}

function renderDreams(list, status) {
    switch (status) {
        default:
        case "unstarted":
            dreamUnstartedSection.innerHTML = "";
            break;
        case "inprogress":
            dreamInProgressSection.innerHTML = "";
            break;
        case "finished":
            dreamFinishedSection.innerHTML = "";
            break;
    }

    list.forEach(elem => {
        console.log("recorre lista")
        const newDreamItem = document.createElement("div");
        newDreamItem.classList.add("dreamBoard__item");
        newDreamItem.innerHTML = `
            <span class="dreamBoard__item__title">
                ${elem.goal}
            </span>
            <button class="dreamBoard__item__deleteBtn">x</button>
            <div class="dreamBoard__item__objective">
                <img src="./src/images/moneyIcon.svg" alt="">
                <span class="dreamBoard__item__objective--value">$${elem.quantity}</span>
            </div>
            <div class="dreamBoard__item__objective">
                <img src="./src/images/dateIcon.svg" alt="">
                <span class="dreamBoard__item__objective--value">${elem.time}</span>
            </div>
            <button class="nextState">Siguiente estado</button>`

        switch (status) {
            default:
            case "unstarted":
                dreamUnstartedSection.appendChild(newDreamItem);
                console.log("agregado sin comenzar")
                break;
            case "inprogress":
                dreamInProgressSection.appendChild(newDreamItem);
                break;
            case "finished":
                dreamFinishedSection.appendChild(newDreamItem);
                break;
        }
    })
}

function addNewDream() {
    const dreamGoal = dreamBoardForm.goal.value;
    const dreamQuantity = dreamBoardForm.quantity.value;
    const dreamTime = dreamBoardForm.time.value;

    const newDream = {
        goal: dreamGoal,
        quantity: dreamQuantity,
        time: dreamTime,
        status: "unstarted"
    }

    userDreamsRef.add(
        newDream
    )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    getUserDreams();
    dreamBoardAddModal.classList.add("hidden");
}

dreamBoardAddBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.remove("hidden");
})

dreamBoardCloseModalBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.add("hidden");
})