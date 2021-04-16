const dreamBoardAddModal = document.querySelector(".dreamBoard__addModal");
const dreamBoardAddBtn = document.querySelector(".dreamBoard__addBtn");
const dreamBoardCloseModalBtn = document.querySelector(".dreamBoard__addClose");
const dreamBoardForm = document.querySelector(".dreamBoard__form");

let unstartedDreamsList = [];
let inProgressDreamsList = [];
let finishedDreamsList = [];

dreamBoardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewDream();
})

function getUserDreams() {
    userDreamsRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
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