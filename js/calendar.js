// Массив с названиями дней недели
const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// Функция для генерации календаря
function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = '';

    // Добавляем дни недели
    for (const day of daysOfWeek) {
        const dayElement = document.createElement('span');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendarContainer.appendChild(dayElement);
    }

    // Текущий день месяца (начиная с 1)
    let dayOfMonth = 1;

    // Флаг, который показывает, были ли добавлены все дни месяца
    let allDaysAdded = false;

    // Добавляем даты месяца
    for (let i = 0; i < 42; i++) {
        const dateElement = document.createElement('button');
        dateElement.classList.add('date');

        if (!allDaysAdded) {
            if (i >= startDayOfWeek) {
                dateElement.textContent = dayOfMonth;
                dateElement.addEventListener('click', () => selectDate(dayOfMonth));
                dayOfMonth++;
                if (dayOfMonth > daysInMonth) {
                    allDaysAdded = true;
                }
            } else {
                dateElement.classList.add('faded');
                const prevMonthDays = daysInMonth - startDayOfWeek + i + 1;
                dateElement.textContent = prevMonthDays;
            }
        } else {
            const nextMonthDays = dayOfMonth - daysInMonth;
            dateElement.classList.add('faded');
            dateElement.textContent = nextMonthDays;
            dayOfMonth++;
        }

        if (dayOfMonth - 1 === new Date().getDate() && month === new Date().getMonth()) {
            dateElement.classList.add('current-day');
        }

        calendarContainer.appendChild(dateElement);
    }

    const currentMonthElement = document.getElementById('currentMonth');
    currentMonthElement.textContent = new Date(year, month).toLocaleString('En', {
        month: 'long',
        year: 'numeric'
    });
}



function getCurrentMonthAndYear() {
    const currentMonthElement = document.getElementById('currentMonth');
    const [monthName, year] = currentMonthElement.textContent.split(' ');
    const month = new Date(Date.parse(`${monthName} 1, ${year}`)).getMonth();
    return {
        month,
        year: parseInt(year)
    };
}

// Updated function for navigating to the previous month
function prevMonth() {
    const {
        month,
        year
    } = getCurrentMonthAndYear();
    if (month === 0) {
        generateCalendar(year - 1, 11);
    } else {
        generateCalendar(year, month - 1);
    }
}

// Updated function for navigating to the next month
function nextMonth() {
    const {
        month,
        year
    } = getCurrentMonthAndYear();
    console.log(month);
    if (month === 11) {
        generateCalendar(year + 1, 0);
    } else {
        generateCalendar(year, month + 1);
    }
}

let hideDatepickerTimer;

// Функция для обработки выбора даты (просто для примера, можно изменить на свою логику)
function showDatepicker() {
    clearTimeout(hideDatepickerTimer);
    const datepickerPopup = document.getElementById('datepicker-popup');
    datepickerPopup.style.display = 'block';
    datepickerPopup.classList.remove('hidden');

    const dateDiv = document.getElementById('date');
    const dateDivRect = dateDiv.getBoundingClientRect();

    // Устанавливаем позицию datepicker относительно body
    let topPosition = dateDivRect.bottom;
    let leftPosition = dateDivRect.left;

    // Добавляем значения для увеличения "невидимых" границ
    const extraBorder = 10; // Можете изменить значение по вашему усмотрению

    // Проверяем, чтобы datepicker не выходил за границы экрана по вертикали
    if (topPosition + datepickerPopup.clientHeight + extraBorder > window.innerHeight) {
        topPosition = window.innerHeight - datepickerPopup.clientHeight - extraBorder;
    }

    // Проверяем, чтобы datepicker не выходил за границы экрана по горизонтали
    if (leftPosition + datepickerPopup.clientWidth + extraBorder > window.innerWidth) {
        leftPosition = window.innerWidth - datepickerPopup.clientWidth - extraBorder;
    }

    datepickerPopup.style.top = topPosition + 20 + 'px';
    datepickerPopup.style.left = leftPosition - 5 + 'px';
}

// Функция для скрытия datepicker с задержкой
function hideDatepickerWithDelay() {
    hideDatepickerTimer = setTimeout(() => {
        const datepickerPopup = document.getElementById('datepicker-popup');
        datepickerPopup.classList.add('hidden');
        setTimeout(() => {
            datepickerPopup.style.display = 'none';
        }, 200);

    }, 400); // Задержка в миллисекундах (в данном примере 400 мс)
}

// Отменяем скрытие datepicker, если пользователь вернул мышку на datepicker
function cancelHideDatepicker() {
    clearTimeout(hideDatepickerTimer);
}

// Обработчик события при наведении на div с id="date"
const dateDiv = document.getElementById('date');
dateDiv.addEventListener('mouseenter', showDatepicker);
dateDiv.addEventListener('mouseleave', hideDatepickerWithDelay);

// Обработчик события, чтобы datepicker оставался видимым при наведении на него
const datepickerPopup = document.getElementById('datepicker-popup');
datepickerPopup.addEventListener('mouseenter', cancelHideDatepicker);
datepickerPopup.addEventListener('mouseleave', hideDatepickerWithDelay);