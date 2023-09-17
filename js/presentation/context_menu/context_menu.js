class ContextMenu {
    constructor(menuItems = [], mode = "dark", event) {
        this.menuItems = menuItems;
        this.mode = mode;
        this.menuItemsNode = this.getMenuItemsNode();
        this.event = event;
        this.init();
    }

    renderMenu() {
        const menuContainer = document.createElement("UL");

        menuContainer.classList.add("contextMenu");
        menuContainer.setAttribute("data-theme", this.mode);

        this.menuItemsNode.forEach(item => menuContainer.appendChild(item));

        this.container = menuContainer;

        return menuContainer;
    }

    closeMenu() {
        this.container.remove();
    }

    init() {
        const contextMenu = this.renderMenu();
        const { clientX, clientY } = this.event;
        document.body.appendChild(contextMenu);

        const positionY =
        clientY + contextMenu.scrollHeight >= window.innerHeight ?
        window.innerHeight - contextMenu.scrollHeight - 20 :
        clientY;
        const positionX =
        clientX + contextMenu.scrollWidth >= window.innerWidth ?
        window.innerWidth - contextMenu.scrollWidth - 20 :
        clientX;

        contextMenu.setAttribute(
        "style",
        `--width: ${contextMenu.scrollWidth}px;
        --height: ${contextMenu.scrollHeight}px;
        --top: ${positionY}px;
        --left: ${positionX}px;`);
    }

    getMenuItemsNode() {
        const nodes = [];

        if (!this.menuItems) {
            console.error("getMenuItemsNode :: Please enter menu items");
            return [];
        }

        this.menuItems.forEach((data, index) => {
            const item = this.createItemMarkup(data);
            item.firstChild.setAttribute(
            "style",
            `animation-delay: ${index * 0.08}s`);

            nodes.push(item);
        });

        return nodes;
    }

    createItemMarkup(data) {
        const button = document.createElement("BUTTON");
        const item = document.createElement("LI");

        button.innerHTML = data.content;
        button.classList.add("contextMenu-button");
        item.classList.add("contextMenu-item");

        if (data.divider) item.setAttribute("data-divider", data.divider);
        item.appendChild(button);

        if (data.events && data.events.length !== 0) {
            Object.entries(data.events).forEach(event => {
            const [key, value] = event;
            button.addEventListener(key, value);
            });
        }

        return item;
    }
}

class ContextMenuHelper {
    static instance = null;

    static getInstance() {
      if (!ContextMenuHelper.instance) {
        ContextMenuHelper.instance = new ContextMenuHelper();
      }
      return ContextMenuHelper.instance;
    }

    constructor() {
        this.menus = [];
        this.target = '.neu-btn';
    }

    closeMenus() {
        this.menus.forEach(element => {
            element.closeMenu();
        });
        this.menus = [];
    }

    showMenu(event, menuItems) {
        event.preventDefault();
        event.stopPropagation();
        this.closeMenus();
        this.menus.push(new ContextMenu(menuItems, 'light', event));
    }
}
  
document.addEventListener("click", () => ContextMenuHelper.getInstance().closeMenus());
window.addEventListener("blur", () => ContextMenuHelper.getInstance().closeMenus());