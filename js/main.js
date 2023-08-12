function preloadAnimations() {
    let items = document.querySelectorAll('.preload');
    setTimeout(() => {
        items.forEach(element => {
            element.classList.remove('preload');
        });
    }, 500);
}

preloadAnimations();
updateTime();
setInterval(updateTime, 1000);
updateWeather();
setInterval(updateWeather, 300000);
startSleepTimer();

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
generateCalendar(currentYear, currentMonth);

const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', toggleSettingsMenu)

const openAddPanelButton = document.getElementById('addPanel');
openAddPanelButton.addEventListener('click', createPanel)

const addPanelButton = document.getElementById('addNewPanel');
addPanelButton.addEventListener('click', addNewPanel)

const closePanelPopupButton = document.getElementById('closePanelPopup');
closePanelPopupButton.addEventListener('click', closePanelPopup);

const temperatureDiv = document.getElementById('temperature');
temperatureDiv.addEventListener('click', updateWeather);

const calendarNextMonthButton = document.getElementById('nextMonth');
calendarNextMonthButton.addEventListener('click', nextMonth);

const calendarPrevMonthButton = document.getElementById('prevMonth');
calendarPrevMonthButton.addEventListener('click', prevMonth);

const editorButton = document.getElementById('editor');
editorButton.addEventListener('click', enableEditor);