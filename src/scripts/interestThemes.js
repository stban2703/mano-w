const interestThemesSection = document.querySelector(".interestThemes__content");
const interestThemesNextBtn = document.querySelector(".interestThemes__next");
let interestThemesList = [
    {
        title: "Emprendimiento",
        value: "emprendimiento",
        url: "emprendimiento",
        isSelected: false
    },
    {
        title: "Motivación",
        value: "motivacion",
        url: "motivacion",
        isSelected: false
    },
    {
        title: "Emocional",
        value: "emocional",
        url: "emocional",
        isSelected: false
    },
    {
        title: "Ahorro",
        value: "ahorro",
        url: "ahorro",
        isSelected: false
    },
    {
        title: "Inversiones",
        value: "inversiones",
        url: "inversiones",
        isSelected: false
    },
    {
        title: "Créditos",
        value: "creditos",
        url: "creditos",
        isSelected: false
    }
]

renderInterestThemes(interestThemesList);
handleInterestThemeNext();

function renderInterestThemes(list) {
    interestThemesSection.innerHTML = "";
    list.forEach(elem => {
        const interestThemeItem = document.createElement("div");
        interestThemeItem.classList.add("interestThemes__content__item");
        if (elem.isSelected) {
            interestThemeItem.classList.add("interestThemes__content__item--selected");
        }
        interestThemeItem.innerHTML =
            `
            <div class="interestThemes__content__item__graphic">
                <img src="./src/images/${elem.url}.svg" alt="">
            </div>
            <p>${elem.title}</p>
            `
        handleSelectInterestTheme(interestThemeItem, elem);
        interestThemesSection.appendChild(interestThemeItem);
    })
}

function handleSelectInterestTheme(elem, obj) {
    elem.addEventListener("click", () => {
        obj.isSelected = !obj.isSelected;
        renderInterestThemes(interestThemesList);
    })
}

function handleInterestThemeNext() {
    interestThemesNextBtn.addEventListener("click", () => {
        let urlFilters = "";
        interestThemesList.forEach((elem, i) => {
            if (elem.isSelected) {
                urlFilters += elem.value + "-";
            }
        })
        urlFilters = urlFilters.substring(0, urlFilters.length - 1);
        window.location = `events.html?${urlFilters}`;
    })
}
