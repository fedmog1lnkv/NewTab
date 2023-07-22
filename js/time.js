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
    console.log("Update Google calendar icon");
    const dayNum = new Date().getDate();
    const icon = document.getElementById("google_calendar");

    icon.src = icon.src.split('#')[0] + '#d' + (dayNum < 10 ? '0' : '') + dayNum;
}