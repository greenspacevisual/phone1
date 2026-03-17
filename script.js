// Функция переключения вкладок
function showTab(tabId) {
    // Скрываем все вкладки
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });

    // Очищаем результаты поиска при уходе с вкладки «Поиск»
    if (tabId !== 'search') {
        document.getElementById('searchResults').innerHTML = '';
    }

    // Показываем выбранную вкладку
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active'); // Добавляем класс active
    } else {
        console.error('Вкладка с ID "' + tabId + '" не найдена!');
        return;
    }

    // Обновляем активную ссылку в навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        }
    });

    // Автофокус на поиске при открытии вкладки «Поиск»
    if (tabId === 'search') {
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 100);
    }

    // Дополнительные действия при переключении вкладок
    switch (tabId) {
        case 'home':
            renderPhones('phoneCards');
            break;
        case 'search':
            // Если был текст в поиске — показываем результаты, иначе — пустой контейнер
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            if (searchQuery) {
                filteredPhones = phones.filter(phone =>
                    phone.name.toLowerCase().includes(searchQuery)
                );
                renderPhones('searchResults');
            }
            break;
        case 'top':
            renderTopPhones();
            break;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем главную вкладку
    showTab('home'); // Явно вызываем переключение на «Главная» при загрузке

    // Добавляем контейнер для подсказок
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestions-list';
    suggestionsContainer.className = 'suggestions-container';
    document.querySelector('.search-container').appendChild(suggestionsContainer);

    // Назначаем обработчики кликов для навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId); // Вызываем функцию переключения
        });
    });

    // Обработчик ввода в поле поиска
    document.getElementById('searchInput').addEventListener('input', showSuggestions);

    // Кнопка «Найти»
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        filteredPhones = phones.filter(phone =>
            phone.name.toLowerCase().includes(searchQuery)
        );
        showTab('search'); // Переключаемся на вкладку «Поиск»
        renderPhones('searchResults');
    });
});
