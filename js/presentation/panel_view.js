function createPanelElement(panel) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');
    linkElement.setAttribute('href', panel.url);

    const imgElement = document.createElement('img');
    imgElement.setAttribute('id', panel.id);
    imgElement.setAttribute('src', panel.icon);
    imgElement.setAttribute('alt', panel.name);

    const textNode = document.createTextNode(panel.name);

    linkElement.appendChild(imgElement);
    linkElement.appendChild(textNode);
    return linkElement;
}

function renderPanels(panels) {
    const linksBlock = document.getElementById('links');
    linksBlock.innerHTML = '';

    panels.forEach(panel => {
        const panelElement = createPanelElement(panel);
        linksBlock.appendChild(panelElement);
    });
}

PanelRepository.getInstance().subscribeToPanels((panels) => {
    renderPanels(panels);
});

PanelRepository.getInstance().getPanels();