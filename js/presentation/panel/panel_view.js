const copyIcon = `<span class="material-symbols-outlined">content_copy</span>`;
const editIcon = `<span class="material-symbols-outlined">edit</span>`;
const moveForwardIcon = `<span class="material-symbols-outlined">arrow_back</span>`;
const moveBackwardIcon = `<span class="material-symbols-outlined">arrow_forward</span>`;
const deleteIcon = `<span class="material-symbols-outlined">delete</span>`;

function createPanelElement(panel, editMode) {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('class', 'neu-btn');

    //TODO: Add actions
    const menuItems = [{
            content: `${copyIcon}Copy`,
            events: {
                click: e => console.log(e, "Copy Button Click")
            }
        },
        {
            content: `${editIcon}Edit`
        },
        {
            content: `${moveForwardIcon}Move Forward`
        },
        {
            content: `${moveBackwardIcon}Move Backward`
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
        e.preventDefault();
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