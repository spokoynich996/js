const STORAGE_KEY = 'warehouseItems';

export const storage = {
    getItems() {
        const items = localStorage.getItem(STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    },

    saveItems(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    },

    addItem(item) {
        const items = this.getItems();
        items.push({
            id: Date.now(),
            ...item
        });
        this.saveItems(items);
    },

    deleteItem(id) {
        let items = this.getItems();
        items = items.filter(item => item.id !== id);
        this.saveItems(items);
    }
};
