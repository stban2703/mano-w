function handleHeader() {
    const header = document.querySelector(".header");

    if (header) {
        const headerUser = header.querySelector(".header__user");
        const headerLogin = header.querySelector(".header__login");
        const headerRegister = header.querySelector(".header__register");
        const headerLogOut = header.querySelector(".header__logOut");
        const dreamBoardSection = header.querySelector(".header__section--dreamBoard");

        if (userInfo) {
            headerUser.classList.remove("hidden");
            headerLogOut.classList.remove("hidden");
            headerLogin.classList.add("hidden");
            headerRegister.classList.add("hidden");
            dreamBoardSection.classList.remove("hidden");
        }
    }
}