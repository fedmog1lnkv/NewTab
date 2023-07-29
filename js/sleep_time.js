let sleepTimer; // Переменная для хранения ID таймера
const mainDiv = document.getElementById("main");
const bgVideo = document.getElementById("bgvideo");
const clockDiv = document.getElementById("sleep_clock");

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
    bgVideo.classList.add('darkBg');
    bgVideo.classList.add('slideUp');
    clockDiv.classList.remove("hidden"); // Show the clock
}

function unSleep() {
    bgVideo.style = '';
    mainDiv.style = '';
    mainDiv.classList.remove('hidden');
    bgVideo.classList.remove('slideUp');
    bgVideo.classList.remove('darkBg');

    clockDiv.classList.add("hidden"); // Hide the clock again
}

var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))
var last = new Date(0)
last.setUTCHours(-1)
var tickState = true

function updateClockSleep() {
    var now = new Date
    var lastHours = last.getHours().toString()
    var nowHours = now.getHours().toString()
    if (lastHours !== nowHours) {
        updateContainer(hoursContainer, nowHours)
    }
    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes)
    }
    var lastSeconds = last.getSeconds().toString()
    var nowSeconds = now.getSeconds().toString()
    if (lastSeconds !== nowSeconds) {
        //tick()
        updateContainer(secondsContainer, nowSeconds)
    }
    last = now
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
    var time = newTime.split('')
    if (time.length === 1) {
        time.unshift('0')
    }
    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0])
    }
    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1])
    }
}

function updateNumber(element, number) {
    //element.lastElementChild.textContent = number
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number
    element.appendChild(second)
    element.classList.add('move')
    setTimeout(function () {
        element.classList.remove('move')
    }, 990)
    setTimeout(function () {
        element.removeChild(element.firstElementChild)
    }, 990)
}

setInterval(updateClockSleep, 100)
document.addEventListener('mousemove', startSleepTimer);