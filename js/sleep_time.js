let sleepTimer; // Переменная для хранения ID таймера
const mainDiv = document.getElementById("main");
const bgVideo = document.getElementById("bgvideo");

function startSleepTimer() {
    // Сбрасываем предыдущий таймер (если он был)
    clearTimeout(sleepTimer);
    unSleep();

    // Запускаем новый таймер, который вызовет вашу функцию через 1 минуту (60 секунд)
    sleepTimer = setTimeout(sleep, 10000); // 60000 миллисекунд = 60 секунд
}

function sleep() {
    // Ваша функция, которую нужно вызвать после бездействия мыши в течение 1 минуты
    console.log('Функция запущена после бездействия мыши в течение 1 минуты');
    mainDiv.classList.add('hidden');
    bgVideo.classList.add('slideUp');


}

function unSleep() {
    bgVideo.style = '';
    mainDiv.style = '';
    mainDiv.classList.remove('hidden');
    bgVideo.classList.remove('slideUp');
}

document.addEventListener('mousemove', startSleepTimer);