function createPanelElement(panel, editMode) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');

    if (!editMode) {
        linkElement.setAttribute('href', panel.url);
    } else {
        //TODO REMOVE THIS
        linkElement.addEventListener('click', () => {
            PanelRepository.getInstance().removePanel(panel.id);
        });
    }

    const imgElement = document.createElement('img');
    imgElement.setAttribute('id', panel.id);
    imgElement.setAttribute('src', panel.icon);
    imgElement.setAttribute('alt', panel.name);

    const textNode = document.createTextNode(panel.name);

    linkElement.appendChild(imgElement);
    linkElement.appendChild(textNode);

    if(editMode) {
        //TODO: ADD DELETE BUTTON
        const deleteNode = document.createTextNode("ПИЗДА");
        deleteNode.addEventListener('click', () => {
            PanelRepository.getInstance().removePanel(panel.id);
        });
        linkElement.appendChild(deleteNode);
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