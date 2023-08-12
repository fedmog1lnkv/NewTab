function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
}

function createPanel() {
    const popup = document.getElementById('add-panel-popup');
    popup.style.display = 'block';
}

function closePanelPopup() {
    const popup = document.getElementById('add-panel-popup');
    popup.style.display = 'none';
}

function addNewPanel() {
    const panelName = document.getElementById('panelNameInput').value;
    const panelImage = document.getElementById('panelImageInput').value;
    const panelUrl = document.getElementById('panelUrlInput').value;
    PanelRepository.getInstance().addPanel(panelName, panelImage, panelUrl);
    PanelRepository.getInstance().confirmPanels();
    closePanelPopup();
}

function enableEditor() {
    if (PanelController.getInstance().getEditMode()) {
        PanelController.getInstance().cancelEditModeChanges();
    } else {
        PanelController.getInstance().enterEditMode();
    }
}

function uploadFile() {
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