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
    unstartedDreamsList = [];
    inProgressDreamsList = [];
    finishedDreamsList = [];

    userDreamsRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                let dreamObject = doc.data();
                dreamObject.id = doc.id;
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
            renderDreams(unstartedDreamsList, inProgressDreamsList, finishedDreamsList);
        });

}

function renderDreams(unstartedList, inProgressList, finishedList) {
    dreamUnstartedSection.innerHTML = "";
    dreamInProgressSection.innerHTML = "";
    dreamFinishedSection.innerHTML = "";
    appendDreamItems(unstartedList);
    appendDreamItems(inProgressList);
    appendDreamItems(finishedList);
}

function appendDreamItems(list) {
    list.forEach(elem => {
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
            ${(elem.status != "finished") ? `<button class="nextState">Siguiente estado</button>` : ''}`


        switch (elem.status) {
            default:
            case "unstarted":
                dreamUnstartedSection.appendChild(newDreamItem);
                handleChangeStatus(newDreamItem, elem, "inprogress");
                break;
            case "inprogress":
                dreamInProgressSection.appendChild(newDreamItem);
                handleChangeStatus(newDreamItem, elem, "finished");
                break;
            case "finished":
                dreamFinishedSection.appendChild(newDreamItem);
                break;
        }
        handleRemoveDream(newDreamItem, elem);

    })
}

function handleChangeStatus(htmlElement, elem, newStatus) {
    const nextStateBtn = htmlElement.querySelector(".nextState");
    nextStateBtn.addEventListener('click', () => {
        console.log(elem.id);
        userDreamsRef.doc(elem.id).update({
            status: newStatus
        })
            .then(() => {
                console.log("Document successfully updated!");
                getUserDreams();
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    })
}

function handleRemoveDream(htmlElement, elem) {
    const deleteBtn = htmlElement.querySelector(".dreamBoard__item__deleteBtn");
    deleteBtn.addEventListener('click', () => {
        userDreamsRef.doc(elem.id).delete().then(() => {
            console.log("Document successfully deleted!");
            getUserDreams();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
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