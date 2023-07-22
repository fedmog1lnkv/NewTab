function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    timeElement.textContent = now.toLocaleTimeString();

    const dateElement = document.getElementById('date');
    dateElement.textContent = now.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long'
    });
}



function updateGoogleCalendarIcon() {
    const now = new Date();
    const day = now.getDay();
    const icon = document.getElementById("google_calendar");

    icon.src = icon.src.split('#')[0] + '#d' + (day < 10 ? '0' : '') + day;
}

function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
}

function openEditor() {
    // Ваш код для выполнения функции "Редактор"
}

function uploadFile() {
    // Ваш код для выполнения функции "Загрузить"
}

function downloadFile() {
    // Ваш код для выполнения функции "Скачать"
}




