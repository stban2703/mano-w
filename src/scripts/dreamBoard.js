const dreamBoardAddModal = document.querySelector(".dreamBoard__addModal");
const dreamBoardAddBtn = document.querySelector(".openModal--dreamBoard");
const dreamBoardButtonOpen = document.querySelector('.openModal__btn');
const dreamBoardNotification = document.querySelector(".openModal__notification")
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
    dreamBoardAddBtn.classList.remove("hidden");
    addNewDream();
});

hideDreamBoardNotification();

dreamBoardAddBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.remove("hidden");
    dreamBoardAddBtn.classList.add("hidden");
})

dreamBoardCloseModalBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.add("hidden");
    dreamBoardAddBtn.classList.remove("hidden");
})

// Abrir u ocultar notificacion cuando el mouse entra o sale
dreamBoardButtonOpen.addEventListener('mouseenter', handleOpenMessageAddClass);
dreamBoardButtonOpen.addEventListener('mouseleave', handleOpenMessageRemoveClass);

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
        //newDreamItem.setAttribute('draggable', 'true');
        //newDreamItem.setAttribute('onDragEnd', 'dragEndHandler(event)');
        newDreamItem.classList.add("dreamItem");
        newDreamItem.innerHTML = `
                <section class="dreamItem__header">
                    <span class="dreamItem__title">
                        ${elem.goal}
                    </span>
                    <button class="dreamItem__deleteBtn">x</button>
                </section>
                <section class="dreamItem__section">
                    <div class="dreamItem__info">
                        <img src="./src/images/moneyIcon.svg" alt="">
                        <span class="dreamItem__value">${formatMoney(elem.quantity)}</span>
                    </div>
                    <div class="dreamItem__info">
                        <img src="./src/images/dateIcon.svg" alt="">
                        <span class="dreamItem__value">01/01/2021</span>
                    </div>
                </section>
                ${(elem.status == "inprogress") ?
                `<form class="dreamItem__payForm">
                    <label for="pay">Ingresa la cantidad a abonar</label>
                    <input type="number" name="pay" placeholder="0" required>
                    <button class="dreamItem__btn">Abonar a la meta</button>
                </form>
                <section class="dreamItem__remainingSection">
                    <h4>Ahora te falta:</h4>
                    <h2 class="dreamItem__remainingMoney">${formatMoney(elem.quantity - elem.pay)}</h2>
                    <h5>para cumplir tu sueño</h4>
                </section>` : ''}
                 ${(elem.status == "unstarted") ?
                `<section class="dreamItem__controls">
                    <button class="dreamItem__btn nextState">Iniciar</button>
                </section>
                ` : ''
            }`
        /*${(elem.status != "unstarted") ? `<button class="dreamBoard__itemBtn backState state">Anterior estado</button>` : ''}
        ${(elem.status != "finished") ? `<button class="dreamBoard__itemBtn nextState state">Siguiente estado</button>` : ''}*/

        switch (elem.status) {
            default:
            case "unstarted":
                dreamUnstartedSection.appendChild(newDreamItem);
                handleChangeStatus(newDreamItem, elem, "inprogress");
                break;
            case "inprogress":
                dreamInProgressSection.appendChild(newDreamItem);
                handleChangeStatus(newDreamItem, elem, "finished");
                handlePayToGoal(newDreamItem, elem);
                break;
            case "finished":
                dreamFinishedSection.appendChild(newDreamItem);
                break;
        }
        handleRemoveDream(newDreamItem, elem);
    })
}

function handleChangeStatus(htmlElement, elem, newStatus) {
    const stateBtn = htmlElement.querySelector(".nextState");

    if (stateBtn) {
        stateBtn.addEventListener('click', () => {
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
}

function handleRemoveDream(htmlElement, elem) {
    const deleteBtn = htmlElement.querySelector(".dreamItem__deleteBtn");
    deleteBtn.addEventListener('click', () => {
        userDreamsRef.doc(elem.id).delete().then(() => {
            console.log("Document successfully deleted!");
            getUserDreams();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    })
}

function handlePayToGoal(htmlElement, elem) {
    const payForm = htmlElement.querySelector(".dreamItem__payForm");
    if (payForm) {
        payForm.addEventListener('submit', event => {
            let sum = parseInt(elem.pay) + parseInt(payForm.pay.value);
            console.log(sum)
            event.preventDefault();
            if (sum < elem.quantity) {
                userDreamsRef.doc(elem.id).update({
                    pay: sum
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        getUserDreams();
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            } else if (sum >= elem.quantity) {
                userDreamsRef.doc(elem.id).update({
                    pay: sum,
                    status: "finished"
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        getUserDreams();
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }
        })
    }
}

function addNewDream() {
    const dreamGoal = dreamBoardForm.goal.value;
    const dreamQuantity = dreamBoardForm.quantity.value;
    const dreamTime = dreamBoardForm.time.value;

    const newDream = {
        goal: dreamGoal,
        quantity: parseInt(dreamQuantity),
        time: dreamTime,
        status: "unstarted",
        pay: parseInt(0)
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

function formatMoney(money) {
    return new Intl.NumberFormat("co-ES", { style: "currency", currency: "COP" }).format(money).replace(/(\.|,)00$/g, '');
}

function hideDreamBoardNotification() {
    setTimeout(() => {
        dreamBoardNotification.classList.add("openModal__notification--hidden");
    }, 4500);
}

function handleOpenMessageRemoveClass() {
    dreamBoardNotification.classList.add('openModal__notification--hidden');
}

function handleOpenMessageAddClass() {
    dreamBoardNotification.classList.remove('openModal__notification--hidden');
}

/*function dragOverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    console.log('Dropeado');
    console.log(ev.target);
}
function dragEndHandler(ev) {
    ev.preventDefault();
    console.log('dragEnded');
    console.log(ev.target);
}*/