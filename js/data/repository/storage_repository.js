class StorageRepository {

    static KEY_PANELS = 'KEY_PANELS';

    static instance = null;

    static getInstance() {
        if (!StorageRepository.instance) {
            StorageRepository.instance = new StorageRepository();
        }
        return StorageRepository.instance;
    }

    async saveData(key, data) {
        return new Promise((resolve, reject) => {
          try {
            localStorage.setItem(key, data);
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
    }
    
    async getData(key) {
        return new Promise((resolve, reject) => {
            try {
            const data = localStorage.getItem(key);
            resolve(data);
            } catch (error) {
            reject(error);
            }
        });
    }
}