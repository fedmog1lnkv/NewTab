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
    const id = this.generateUniqueId();
    const panel = new Panel(id, name, image, url);
    this.panels.push(panel);
    this.notifyPanelsSubscribers();
  }

  async removePanel(id) {
    this.panels = this.panels.filter((panel) => panel.id !== id);
    this.notifyPanelsSubscribers();
  }

  async confirmPanels() {
    const serializedPanels = this.panels.map((panel) => JSON.stringify(panel));
    return this.chromeRepository.saveData(StorageRepository.KEY_PANELS, "["+serializedPanels+"]");
  }

  async cancelPanels() {
    this.panels = [];
    await this.getPanels();
  }

  async getPanels() {
    const serializedPanels = await this.chromeRepository.getData(StorageRepository.KEY_PANELS);

    console.log(serializedPanels);

    const panelsArray = JSON.parse(serializedPanels) ?? [];
  
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
