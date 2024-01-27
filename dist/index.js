"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main-container");
//reusable functin
async function myCustomFunction(url, option) {
    const response = await fetch(url, option);
    if (!response.ok) {
        throw new Error(`Network was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
//display the card UI
const showResultUI = (singleUser) => {
    const { avatar_url, login, location, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'>
        <img src=${avatar_url} alt=${login}/>
        <hr />
        <div class='card-footer'>
        <p>${login}</p>
        <a href='${url}'>Github</a>
        </div>
        </div>`);
};
function fetchUserData(url) {
    myCustomFunction(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
            console.log(singleUser);
        }
    });
}
// call function on page reload
fetchUserData("https://api.github.com/users");
//search functionality
formSubmit?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    main_container.innerHTML = '';
    try {
        const url = "https://api.github.com/users"; // Corrected URL
        const allUserData = await myCustomFunction(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class='empty-msg'>No matching users found</p>` // Corrected typo
            );
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (err) { // Correctly placed catch block
        console.log(err);
    }
});
