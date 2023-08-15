const copyIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const cutIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`;
const pasteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;
const downloadIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
const deleteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

function createPanelElement(panel, editMode) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');

    //TODO: Add actions
    const menuItems = [
    {
      content: `${copyIcon}Copy`,
      events: {
        click: e => console.log(e, "Copy Button Click")
      } },
    
    { content: `${pasteIcon}Paste` },
    { content: `${cutIcon}Cut` },
    { content: `${downloadIcon}Download` },
    { content: `${downloadIcon}Download` },
    {
      content: `${deleteIcon}Delete`,
      divider: "top",
      events: {
        click: e => PanelRepository.getInstance().removePanel(panel.id)
      }
    }];

    linkElement.addEventListener("contextmenu", e => {
        e.preventDefault();
        ContextMenuHelper.getInstance().showMenu(e, menuItems);
    });

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