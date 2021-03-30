function handleHeader() {
    const header = document.querySelector(".header");

    if (header) {
        const headerUser = header.querySelector(".header__user");
        const headerLogin = header.querySelector(".header__login");
        const headerRegister = header.querySelector(".header__register");

        if (userInfo) {
            headerUser.classList.remove("hidden");
            headerLogin.classList.add("hidden");
            headerRegister.classList.add("hidden");
        }
    }
}