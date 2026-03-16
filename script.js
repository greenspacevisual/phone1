// Исходные данные о телефонах
const phones = [
    { id: 1, name: "iPhone 14", price: 79990, camera: "12 МП", battery: "3279 мАч", os: "iOS" },
    { id: 2, name: "Samsung S23", price: 69990, camera: "50 МП", battery: "3900 мАч", os: "Android" },
    { id: 3, name: "Xiaomi 13", price: 59990, camera: "54 МП", battery: "4500 мАч", os: "Android" },
    { id: 4, name: "Huawei P50", price: 64990, camera: "50 МП", battery: "4100 мАч", os: "Android" },
    { id: 5, name: "OnePlus 10", price: 67990, camera: "48 МП", battery: "4500 мАч", os: "Android" }
];

// Данные для топа телефонов
const topPhones = [
    {
        name: "iPhone 15 Pro",
        specs: "6.1″ OLED, A17 Bionic, 48 МП камера, 120 Гц"
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        specs: "6.8″ Dynamic AMOLED, Snapdragon 8 Gen 3, 200 МП камера"
    },
    {
        name: "Google Pixel 8",
        specs: "6.2″ OLED, Tensor G3, 50 МП камера, 90 Гц"
    }
];

// Подсказки для поиска
const searchSuggestions = [
    "iPhone 14",
    "Samsung S23",
    "Xiaomi 13",
    "Huawei P50",
    "OnePlus 10",
    "Google Pixel 8",
    "Xiaomi 14 Pro",
    "Apple iPhone 15",
    "Samsung Galaxy Z Flip5"
];

// Фильтрованные телефоны
let filteredPhones = [...phones];

// Функция переключения вкладок
function showTab(tabId) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });

    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');

    // Обновить активную ссылку в навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });

    // При переходе на разные вкладки выполняем нужные действия
    if (tabId === 'home') {
        renderPhones(); // Обновляем список на главной
    }
    if (tabId === 'search') {
        document.getElementById('searchInput').focus();
    }
    if (tabId === 'top') {
        renderTopPhones(); // Заполняем карточки топа
    }
}

// Загрузка карточек телефонов (для главной вкладки)
function renderPhones() {
    const phoneCardsContainer = document.getElementById('phoneCards');
    phoneCardsContainer.innerHTML = '';

    filteredPhones.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'phone-card';
        card.innerHTML = `
            <img src="https://via.placeholder.com/180x120?text=${phone.name}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <p>От ${phone.price} ₽</p>
            <p>Камера: ${phone.camera}</p>
            <p>Батарея: ${phone.battery}</p>
            <p>ОС: ${phone.os}</p>
        `;
        phoneCardsContainer.appendChild(card);
    });
}

// Загрузка карточек топа телефонов
function renderTopPhones() {
    const container = document.getElementById('topPhonesGrid');
    container.innerHTML = '';

    topPhones.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'phone-card';
        card.innerHTML = `
            <h3>${phone.name}</h3>
            <p>${phone.specs}</p>
        `;
        container.appendChild(card);
    });
}

// Обработка поиска по кнопке
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    filteredPhones = phones.filter(phone =>
        phone.name.toLowerCase().includes(searchQuery)
    );
    renderPhones();
});

// Показ и фильтрация подсказок поиска
function showSuggestions() {
    const input = document.getElementById('searchInput');
    const list = document.getElementById('suggestions-list');
    const value = input.value.toLowerCase();

    list.innerHTML = '';

    if (value.length < 1) return;

    const filtered = searchSuggestions.filter(item =>
        item.toLowerCase().includes(value)
    );

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = item;
        div.onclick = () => {
            input.value = item;
            list.innerHTML = ''; // Скрываем список после выбора
            // Автоматически запускаем поиск по выбранной подсказке
            filteredPhones = phones.filter(phone =>
                phone.name.toLowerCase().includes(item.toLowerCase())
            );
            renderPhones();
        };
        list.appendChild(div);
    });
}

// Обработчики для навигации
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        showTab(tabId);
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderPhones(); // Загружаем карточки на главной

    // Добавляем обработчик для подсказок
    document.getElementById('searchInput').addEventListener('input', showSuggestions);
});
