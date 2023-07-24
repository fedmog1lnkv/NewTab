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