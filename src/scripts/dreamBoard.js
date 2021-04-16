const dreamBoardAddModal = document.querySelector(".dreamBoard__addModal");
const dreamBoardAddBtn = document.querySelector(".dreamBoard__addBtn");
const dreamBoardCloseModalBtn = document.querySelector(".dreamBoard__addClose");


dreamBoardAddBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.remove("hidden");
})

dreamBoardCloseModalBtn.addEventListener('click', () => {
    dreamBoardAddModal.classList.add("hidden");
})