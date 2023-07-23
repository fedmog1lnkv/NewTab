function generatePanels() {
    const linksBlock = document.getElementById('links');
    linksBlock.innerHTML = '';

    if (localStorage.getItem('panel_config') == null) {
        localStorage.setItem('panel_config', JSON.stringify(panel_schema));
    }
    const panelSchema = JSON.parse(localStorage.getItem('panel_config'));

    panelSchema.schema.forEach(panel => {
        addPanel(panel);
    });
}

function addPanel(panel) {
    const linksBlock = document.getElementById('links');

    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');
    linkElement.setAttribute('href', panel.url);

    const imgElement = document.createElement('img');
    imgElement.setAttribute('id', panel.id);
    imgElement.setAttribute('src', panel.image);
    imgElement.setAttribute('alt', panel.name);

    const textNode = document.createTextNode(panel.name);

    linkElement.appendChild(imgElement);
    linkElement.appendChild(textNode);
    linksBlock.appendChild(linkElement);
}



function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
}

// Function to show the pop-up window for adding a panel
function createPanel() {
    const popup = document.getElementById('add-panel-popup');
    popup.style.display = 'block';
}

// Function to hide the pop-up window
function closePanelPopup() {
    const popup = document.getElementById('add-panel-popup');
    popup.style.display = 'none';
}

// Function to add a new panel with the provided details
function addNewPanel() {
    const panelId = document.getElementById('panelIdInput').value;
    const panelName = document.getElementById('panelNameInput').value;
    const panelImage = document.getElementById('panelImageInput').value;
    const panelUrl = document.getElementById('panelUrlInput').value;

    // Create a new panel object with the input values
    const newPanel = {
        id: panelId,
        name: panelName,
        image: panelImage,
        url: panelUrl
    };

    console.log(newPanel)

    const panelSchema = JSON.parse(localStorage.getItem('panel_config'));
    panelSchema.schema.push(newPanel);

    localStorage.setItem('panel_config', JSON.stringify(panelSchema));
    console.log(panelSchema)

    // Close the pop-up window after adding the panel
    closePanelPopup();

    // Now you can regenerate the panels with the new data
    generatePanels();
}


function openEditor() {
    // Ваш код для выполнения функции "Редактор"
}

function uploadFile() {
    // Ваш код для выполнения функции "Загрузить"
}

function downloadFile() {
    const jsContent = "var panel_schema = " + localStorage.getItem('panel_config');
    const blob = new Blob([jsContent], {
        type: 'text/javascript'
    });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'panel_config.js'; // Specify the filename for the downloaded file

    // Append the <a> element to the DOM and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by revoking the temporary URL after the download
    URL.revokeObjectURL(downloadLink.href);
}

generatePanels();
updateTime(); // Update time and date immediately after the page loads
updateGoogleCalendarIcon();
setInterval(updateTime, 1000); // Update time and date every second
updateWeather();
setInterval(updateWeather, 300000); // Update weather every 5 minutes
startSleepTimer();