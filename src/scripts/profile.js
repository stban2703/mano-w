var profileName = document.querySelector("#profileName");
var profileLastName = document.querySelector("#profileLastName");
var profileEmail = document.querySelector("#profileEmail");
var profileCC = document.querySelector("#profileCC");
var profileTitle = document.querySelector("#profileTitle");

function setProfileInfo(userInfo) {
    if (document.querySelector(".profile")) {
        console.log(userInfo);
        profileTitle.innerHTML = `${userInfo.name} ${userInfo.surname}`
        profileName.innerHTML= `${userInfo.name}`;
        profileLastName.innerHTML= `${userInfo.surname}`;
        profileEmail.innerHTML= `${userInfo.email}`;
        profileCC.innerHTML = `${userInfo.identification}`
    }
}