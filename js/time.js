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