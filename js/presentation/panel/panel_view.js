const copyIcon = `<span class="material-symbols-outlined">content_copy</span>`;
const editIcon = `<span class="material-symbols-outlined">edit</span>`;
const moveForwardIcon = `<span class="material-symbols-outlined">arrow_back</span>`;
const moveBackwardIcon = `<span class="material-symbols-outlined">arrow_forward</span>`;
const deleteIcon = `<span class="material-symbols-outlined">delete</span>`;

function createPanelElement(panel, editMode) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');

    const menuItems = [{
            content: `${copyIcon}Copy URL`,
            events: {
                click: e => {
                    let url = panel.url;
                    navigator.clipboard.writeText(url)
                        .then(() => {

                        })
                        .catch(err => {
                            console.log('Something went wrong', err);
                        });
                }
            }
        },
        {
            content: `${editIcon}Edit`,
            events: {
                click: e => {
                    // TODO : make an editor
                }
            }
        },
        {
            content: `${moveForwardIcon}Move Forward`,
            events: {
                click: e => {
                    PanelRepository.getInstance().moveForwardPanel(panel.id);
                    PanelRepository.getInstance().confirmPanels();
                }
            }
        },
        {
            content: `${moveBackwardIcon}Move Backward`,
            events: {
                click: e => {
                    PanelRepository.getInstance().moveBackwardPanel(panel.id);
                    PanelRepository.getInstance().confirmPanels();
                }
            }
        },
        {
            content: `${deleteIcon}Delete`,
            divider: "top",
            events: {
                click: e => {
                    PanelRepository.getInstance().removePanel(panel.id);
                    PanelRepository.getInstance().confirmPanels();
                }
            }
        }
    ];

    linkElement.addEventListener("contextmenu", e => {
        ContextMenuHelper.getInstance().showMenu(e, menuItems);
    });

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