const addIcon = `<span class="material-symbols-outlined">add</span>`;
const wallpaperIcon = `<span class="material-symbols-outlined">wallpaper</span>`;
const editorModeIcon = `<span class="material-symbols-outlined">app_registration</span>`;

function showSettingsMenu(e) {
    //TODO: Add actions for main context menu
    const menuItems = [{
            content: `${addIcon}Add panel`,
            events: {
                click: e => createPanel()
            }
        },
        {
            content: `${editorModeIcon}Editor mode`,
            events: {
                click: e => enableEditor()
            }
        },
        {
            content: `${wallpaperIcon}Change Wallpaper`,
            events: {
                click: e => changeWallpaper()
            }
        },
    ];
    ContextMenuHelper.getInstance().showMenu(e, menuItems);
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


function changeWallpaper() {
    const popup = document.getElementById("wallpaper-change-popup");
    popup.style.display = "block";

    const closePopupButton = document.getElementById("closeWallpaperChangePopup");
    closePopupButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    const wallpaperUrlInput = document.getElementById("wallpaperUrlInput");
    const bgvideo = document.getElementById("bgvideo");

    document.getElementById("changeWallpaper").addEventListener("click", function () {
        const newWallpaperUrl = wallpaperUrlInput.value;
        if (newWallpaperUrl) {
            bgvideo.src = newWallpaperUrl;
            // Сохраните новый URL в куки
            document.cookie = `bgvideo=${newWallpaperUrl}`;
            popup.style.display = "none";
        }
    });

    const videoCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('bgvideo='));
    if (videoCookie) {
        const videoUrl = videoCookie.split('=')[1].trim();
        bgvideo.src = videoUrl;
    }
}

function setWallpaper() {
    const bgvideo = document.getElementById("bgvideo");

    const videoCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('bgvideo='));
    if (videoCookie) {
        const videoUrl = videoCookie.split('=')[1].trim();
        bgvideo.src = videoUrl;
    }
}

function uploadFile() {}

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