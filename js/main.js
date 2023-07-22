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

function updateWeather() {
    console.log("Update Weather");
    const temperatureElement = document.getElementById('temperature');

    getWeather()
        .then(weatherData => {
            const temperature = weatherData.main.temp;

            temperatureElement.innerHTML =

                temperature +
                ` <img id="weather_icon" src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png">` +
                'C';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            temperatureElement.textContent = 'N/A'; // Display N/A if there's an error
        });
}



function getGeolocation() {
    return new Promise((resolve, reject) => {
        // Проверяем, есть ли координаты в localStorage
        const storedCoords = localStorage.getItem('coords');
        if (storedCoords) {
            const coords = JSON.parse(storedCoords);
            resolve(coords);
        } else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        // Сохраняем координаты в localStorage
                        const coords = {
                            latitude,
                            longitude
                        };
                        localStorage.setItem('coords', JSON.stringify(coords));

                        resolve(coords);
                    },
                    function (error) {
                        reject("Ошибка получения геолокации: " + error.message);
                    }
                );
            } else {
                reject("Геолокация недоступна в этом браузере.");
            }
        }
    });
}

function getWeather() {
    return getGeolocation()
        .then(coords => {
            const apiKey = '4ddfe4c4d69f262a5ed8facff7cff193';
            const apiUrl =
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`;

            return fetch(apiUrl).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            return Promise.reject(error);
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




updateTime(); // Update time and date immediately after the page loads
updateWeather(); // Update weather immediately after the page loads
updateGoogleCalendarIcon();
setInterval(updateTime, 1000); // Update time and date every second
setInterval(updateWeather, 300000); // Update weather every 5 minutes (300000 ms)