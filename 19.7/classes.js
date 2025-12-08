// Задание 1: Класс Delivery
export class Delivery {
    constructor(name, address, distance) {
        this.name = name;
        this.address = address;
        this.distance = distance;
        this.id = Date.now() + Math.random();
    }

    // Создание карточки
    createCard() {
        const card = document.createElement('div');
        card.className = 'delivery-card';
        card.dataset.id = this.id;

        card.innerHTML = `
            <h3>${this.name}</h3>
            <div class="delivery-info">
                <p><strong>Адрес:</strong> ${this.address}</p>
                <p><strong>Расстояние:</strong> ${this.distance} км</p>
            </div>
            <div class="card-buttons">
                <button class="edit-btn">Изменить</button>
                <button class="delete-btn">Удалить</button>
            </div>
        `;

        return card;
    }
}

// Задание 2: Класс EditDelivery (наследует от Delivery)
export class EditDelivery extends Delivery {
    constructor(name, address, distance, status = 'delivery') {
        super(name, address, distance);
        this.status = status;
    }

    // Переопределяем создание карточки
    createCard() {
        const card = document.createElement('div');
        card.className = 'delivery-card';
        card.dataset.id = this.id;

        const statusText = this.getStatusText();

        card.innerHTML = `
            <div class="status status-${this.status}">${statusText}</div>
            <h3>${this.name}</h3>
            <div class="delivery-info">
                <p><strong>Адрес:</strong> ${this.address}</p>
                <p><strong>Расстояние:</strong> ${this.distance} км</p>
            </div>
            <div class="card-buttons">
                <button class="edit-btn">Изменить</button>
                <button class="delete-btn">Удалить</button>
            </div>
        `;

        return card;
    }

    getStatusText() {
        const statusMap = {
            'delivery': 'Доставляется',
            'delivered': 'Доставлен',
            'canceled': 'Отменён'
        };
        return statusMap[this.status];
    }

    // Задание 3: Статический метод для расчета общего расстояния
    static getTotalDistance(deliveries) {
        let total = 0;
        for (const delivery of deliveries) {
            // Отмененные доставки не считаем
            if (delivery.status !== 'canceled') {
                total += delivery.distance;
            }
        }
        return total;
    }
}
