// Исходные данные о телефонах
const phones = [
    { id: 1, name: "iPhone 14", price: 79990, camera: "12 МП", battery: "3279 мАч", os: "iOS" },
    { id: 2, name: "Samsung S23", price: 69990, camera: "50 МП", battery: "3900 мАч", os: "Android" },
    { id: 3, name: "Xiaomi 13", price: 59990, camera: "54 МП", battery: "4500 мАч", os: "Android" },
    { id: 4, name: "Huawei P50", price: 64990, camera: "50 МП", battery: "4100 мАч", os: "Android" }
];

// Данные для топа телефонов
const topPhones = [
    { name: "iPhone 15 Pro", specs: "6.1″ OLED, A17 Bionic, 48 МП камера, 120 Гц" },
    { name: "Samsung Galaxy S24 Ultra", specs: "6.8″ Dynamic AMOLED, Snapdragon 8 Gen 3, 200 МП камера" },
    { name: "Google Pixel 8", specs: "6.2″ OLED, Tensor G3, 50 МП камера, 90 Гц" }
];

// Подсказки для поиска
const searchSuggestions = [
    "iPhone 14",
    "Samsung S23",
    "Xiaomi 13",
    "Huawei P50",
    "Google Pixel 8",
    "Xiaomi 14 Pro",
    "Apple iPhone 15",
    "Samsung Galaxy Z Flip5"
];

let filteredPhones = [...phones];

// Функция переключения вкладок
function showTab(tabId) {
    // Скрыть все вкладки
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });

    // Очистка результатов поиска при уходе с вкладки «Поиск»
    if (tabId !== 'search') {
        document.getElementById('searchResults').innerHTML = '';
    }

    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');

    // Обновить активную ссылку в навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });

    // Автоматически фокусируем поиск на вкладке "Поиск"
    if (tabId === 'search') {
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 100);
    }

    // Дополнительные действия при переключении
    if (tabId === 'home') {
        renderPhones('phoneCards');
    } else if (tabId === 'top') {
        renderTopPhones();
    }
}

// Отображение карточек телефонов
function renderPhones(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (filteredPhones.length === 0) {
        container.innerHTML = '<p class="no-results">Ничего не найдено</p>';
        return;
    }

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
        container.appendChild(card);
    });
}

// Отображение карточек топовых телефонов
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

    // Всегда переключаемся на вкладку «Поиск» и отображаем результаты там
    showTab('search');
    renderPhones('searchResults');
});

// Показ и фильтрация подсказок поиска
function showSuggestions() {
    const input = document.getElementById('searchInput');
    const list = document.getElementById('suggestions-list');
    const value = input.value.toLowerCase();

    list.innerHTML = '';

    if (value.length < 1) {
        list.classList.remove('visible');
        return;
    }

    const filtered = searchSuggestions.filter(item =>
        item.toLowerCase().includes(value)
    );

    if (filtered.length > 0) {
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = item;
            div.onclick = () => {
                input.value = item;
                list.innerHTML = '';
                list.classList.remove('visible');

                // Автоматически фильтруем и переключаемся на вкладку «Поиск»
                filteredPhones = phones.filter(phone =>
                    phone.name.toLowerCase().includes(item.toLowerCase())
                );
                showTab('search');
                renderPhones('searchResults');
            };
            list.appendChild(div);
        });
        list.classList.add('visible');
    } else {
        list.classList.remove('visible');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderPhones('phoneCards'); // Загружаем карточки на главной

    // Добавляем блок для подсказок в DOM
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestions-list';
    suggestionsContainer.className = 'suggestions-container';
    document.querySelector('.search-container').appendChild(suggestionsContainer);

    // Обработчики для навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // Обработчик для подсказок
    document.getElementById('searchInput').addEventListener('input', showSuggestions);
});
