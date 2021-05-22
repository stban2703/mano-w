const interestThemesSection = document.querySelector(".interestThemes__content");

let interestThemesList = [
    {
        title: "Emprendimiento",
        value: "emprendimiento",
        url: "emprendimiento"
    },
    {
        title: "Motivación",
        value: "motivacion",
        url: "motivacion"
    },
    {
        title: "Emocional",
        value: "emocional",
        url: "emocional"
    },
    {
        title: "Ahorro",
        value: "ahorro",
        url: "ahorro"
    },
    {
        title: "Inversiones",
        value: "inversiones",
        url: "inversiones"
    },
    {
        title: "Créditos",
        value: "creditos",
        url: "creditos"
    }
]

renderInterestThemes(interestThemesList);

function renderInterestThemes(list) {
    interestThemesSection.innerHTML = "";
    list.forEach(elem => {
        const interestThemeItem = document.createElement("div");
        interestThemeItem.classList.add("interestThemes__content__item");
        interestThemeItem.innerHTML =
            `
            <div class="interestThemes__content__item__graphic">
                <img src="./src/images/${elem.url}.svg" alt="">
            </div>
            <p>${elem.title}</p>
            `
        handleSelectInterestTheme(interestThemeItem);
        interestThemesSection.appendChild(interestThemeItem);
    })
}

function handleSelectInterestTheme(elem) {
    elem.addEventListener("click", () => {
        if (elem.classList.contains("interestThemes__content__item--selected")) {
            elem.classList.remove("interestThemes__content__item--selected")
        } else {
            elem.classList.add("interestThemes__content__item--selected")
        }
    })
}
