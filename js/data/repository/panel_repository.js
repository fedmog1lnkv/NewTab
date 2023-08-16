class PanelRepository {
  static instance = null;

  static getInstance() {
    if (!PanelRepository.instance) {
      PanelRepository.instance = new PanelRepository();
    }
    return PanelRepository.instance;
  }

  constructor() {
    this.chromeRepository = StorageRepository.getInstance();
    this.panels = [];
    this.panelsSubscribers = [];
  }

  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  }

  //TODO: ADD SWAP

  async addPanel(name, image, url) {
    let imageUrl = image.trim();
    if (imageUrl == '') {
      imageUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}&sz=256`;
    }
    const id = this.generateUniqueId();
    const panel = new Panel(id, name, imageUrl, url);
    this.panels.push(panel);
    this.notifyPanelsSubscribers();
  }

  async moveForwardPanel(id) {
    const panelIndex = this.panels.findIndex((panel) => panel.id === id);
    console.log(`move forward panel ${panelIndex}`);

    if (panelIndex === -1) {
      throw new Error('Panel not found');
    }

    if (panelIndex === 0) {
      console.log(`Panel is already at the front, no need to move`);
      return;
    }

    [this.panels[panelIndex - 1], this.panels[panelIndex]] = [this.panels[panelIndex], this.panels[panelIndex - 1]];
    console.log(`Panel moved forward. New panels array:`);
    console.log(this.panels);

    this.notifyPanelsSubscribers();
  }

  async moveBackwardPanel(id) {
    const panelIndex = this.panels.findIndex((panel) => panel.id === id);
    console.log(`move backward panel ${panelIndex}`);

    if (panelIndex === -1) {
      throw new Error('Panel not found');
    }

    if (panelIndex === this.panels.length - 1) {
      console.log(`Panel is already at the back, no need to move`);
      return;
    }

    [this.panels[panelIndex + 1], this.panels[panelIndex]] = [this.panels[panelIndex], this.panels[panelIndex + 1]];
    console.log(`Panel moved backward. New panels array:`);
    console.log(this.panels);

    this.notifyPanelsSubscribers();
  }

  async removePanel(id) {
    this.panels = this.panels.filter((panel) => panel.id !== id);
    this.notifyPanelsSubscribers();
  }

  async confirmPanels() {
    const serializedPanels = this.panels.map((panel) => JSON.stringify(panel));
    return this.chromeRepository.saveData(StorageRepository.KEY_PANELS, "[" + serializedPanels + "]");
  }

  async cancelPanels() {
    this.panels = [];
    await this.getPanels();
  }

  async getPanels() {
    const serializedPanels = await this.chromeRepository.getData(StorageRepository.KEY_PANELS);

    console.log(serializedPanels);

    const panelsArray = JSON.parse(serializedPanels) !== null ? JSON.parse(serializedPanels) : [];

    this.panels = panelsArray;

    this.notifyPanelsSubscribers();

    return this.panels;
  }

  subscribeToPanels(callback) {
    this.panelsSubscribers.push(callback);
    this.notifyPanelsSubscribers();
  }

  notifyPanelsSubscribers() {
    for (const subscriber of this.panelsSubscribers) {
      subscriber(this.panels);
    }
  }
}