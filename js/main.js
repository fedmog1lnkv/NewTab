function preloadAnimations() {
    let items = document.querySelectorAll('.preload');
    setTimeout(() => {
        items.forEach(element => {
            element.classList.remove('preload');
        });
    }, 500);
}

preloadAnimations();
generatePanels();
updateTime(); // Update time and date immediately after the page loads
updateGoogleCalendarIcon();
setInterval(updateTime, 1000); // Update time and date every second
updateWeather();
setInterval(updateWeather, 300000); // Update weather every 5 minutes
startSleepTimer();


const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', toggleSettingsMenu)