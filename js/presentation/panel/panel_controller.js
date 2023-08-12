class PanelController {
    static instance = null;

    static getInstance() {
      if (!PanelController.instance) {
        PanelController.instance = new PanelController();
      }
      return PanelController.instance;
    }

    constructor() {
        this.editMode = false;
        this.subscribers = [];
        this.panels = [];

        PanelRepository.getInstance().subscribeToPanels((panels) => {
            this.panels = panels;
            this.notify();
        });
    }

    getEditMode() {
        return this.editMode;
    }

    enterEditMode() {
        this.editMode = true;
        this.notify();
    }

    saveEditModeChanges() {
        this.editMode = false;
        this.notify();
        PanelRepository.getInstance().confirmPanels();
    }

    cancelEditModeChanges() {
        this.editMode = false;
        this.notify();
        PanelRepository.getInstance().cancelPanels();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        this.notify();
    }
    
    notify() {
        for (const subscriber of this.subscribers) {
            subscriber(this.panels, this.editMode);
        }
    }
}