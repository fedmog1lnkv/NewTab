function createPanelElement(panel, editMode) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');

    // disable href attribute
    if (!editMode) {
        linkElement.setAttribute('href', panel.url);
    }

    const imgElement = document.createElement('img');
    imgElement.setAttribute('id', panel.id);
    imgElement.setAttribute('src', panel.icon);
    imgElement.setAttribute('alt', panel.name);

    const textNode = document.createTextNode(panel.name);

    linkElement.appendChild(imgElement);
    linkElement.appendChild(textNode);

    if (editMode) {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';

        deleteButton.addEventListener('click', () => {
            PanelRepository.getInstance().removePanel(panel.id);
        });

        linkElement.style.position = 'relative';

        deleteButton.style.position = 'absolute';
        linkElement.appendChild(deleteButton);
    }


    return linkElement;
}

function renderPanels(panels, editMode) {
    const linksBlock = document.getElementById('links');
    linksBlock.innerHTML = '';

    panels.forEach(panel => {
        const panelElement = createPanelElement(panel, editMode);
        linksBlock.appendChild(panelElement);
    });
}

PanelController.getInstance().subscribe((panels, editMode) => {
    renderPanels(panels, editMode);
});

PanelRepository.getInstance().getPanels();