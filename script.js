// Исходные данные о телефонах
const phones = [
    { id: 1, name: "iPhone 14", price: 79990, camera: "12 МП", battery: "3279 мАч", os: "iOS" },
    { id: 2, name: "Samsung S23", price: 69990, camera: "50 МП", battery: "3900 мАч", os: "Android" },
    { id: 3, name: "Xiaomi 13", price: 59990, camera: "54 МП", battery: "4500 мАч", os: "Android" },
    { id: 4, name: "Huawei P50", price: 64990, camera: "50 МП", battery: "4100 мАч", os: "Android" },
    { id: 5, name: "OnePlus 10", price: 67990, camera: "48 МП", battery: "4500 мАч", os: "Android" }
];

// Фильтрованные телефоны
let filteredPhones = [...phones];

// Загрузка карточек телефонов
function renderPhones() {
    const phoneCardsContainer = document.getElementById('phoneCards');
    phoneCardsContainer.innerHTML = '';

    filteredPhones.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'phone-card';
        card.innerHTML = `
            <img src="https://via.placeholder.com/180x120?text=${phone.name}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <p>От ${phone.price} ₽</p>
            <p>Камера: ${phone.camera}</p>
            <p>Батарея: ${phone.battery}</p>
            <p>ОС: ${phone.os}</p>
        `;
        phoneCardsContainer.appendChild(card);
    });
}

// Обработка поиска
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase