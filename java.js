const getUserBtn = document.querySelector('.loadUsers');
const cont = document.querySelector('.users');
const filterGender = document.querySelector('.filterGender');
let inputSearch = document.querySelector('.input')
let allUsers = [];

window.addEventListener('DOMContentLoaded', () => {
    getUsers();
    filterGender.addEventListener('change', handleFilter);
    inputSearch.addEventListener('input', handleFilter)
    getUserBtn.addEventListener("click", () => getUsers(10));
});

async function getUsers(count = 10) {
    try {
        const res = await fetch(`https://randomuser.me/api/?results=${count}`);
        const data = await res.json();
        allUsers = [...allUsers, ...data.results];
        showUsers(allUsers);
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

function handleFilter() {
    const gender = filterGender.value;
    const filtered = gender === 'all' ? allUsers : allUsers.filter(user => user.gender === gender);
   
    inputSearchUser(filtered)
}

function showUsers(users) {
    cont.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('userItem');
        userItem.innerHTML = `
            <img src="${user.picture.large}" alt="User Picture">
            <h3>${user.name.first}</h3>
            <p>${user.email}, ${user.gender}, ${user.location.country}</p>
            <button data-id="${user.id?.value || 'unknown'}">Save</button>
            <i class='bx bx-check'></i>
        `;
        cont.appendChild(userItem);
    });
}


function inputSearchUser(filteredList = allUsers) {
    const inputValue = inputSearch.value.toLowerCase(); 

    const searchFiltered = filteredList.filter(user =>
        user.name.first.toLowerCase().includes(inputValue)
    );

    showUsers(searchFiltered);
}
