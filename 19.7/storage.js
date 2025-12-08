const STORAGE_KEY = 'deliveries';

export const storage = {
    getDeliveries() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveDeliveries(deliveries) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveries));
    },

    addDelivery(delivery) {
        const deliveries = this.getDeliveries();
        deliveries.push(delivery);
        this.saveDeliveries(deliveries);
    },

    updateDelivery(id, updatedData) {
        const deliveries = this.getDeliveries();
        const index = deliveries.findIndex(d => d.id === id);
        if (index !== -1) {
            deliveries[index] = { ...deliveries[index], ...updatedData };
            this.saveDeliveries(deliveries);
        }
    },

    deleteDelivery(id) {
        const deliveries = this.getDeliveries();
        const newDeliveries = deliveries.filter(d => d.id !== id);
        this.saveDeliveries(newDeliveries);
    }
};
