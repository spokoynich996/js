import { storage } from './modules/storage.js';
import { pages } from './modules/pages.js';

class App {
    constructor() {
        this.currentSort = { field: null, ascending: true };
        this.init();
    }

    init() {
        this.showListPage();
    }

    showLoading(show) {
        const loadingEl = document.getElementById('loading');
        loadingEl.style.display = show ? 'block' : 'none';
    }

    showListPage() {
        this.showLoading(true);
        
        // Рендерим страницу
        document.getElementById('content').innerHTML = pages.renderList();
        
        // Обработчики событий
        document.getElementById('addBtn').addEventListener('click', () => {
            this.showAddPage();
        });
        
        // Сортировка
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', (e) => {
                const field = e.target.dataset.sort;
                this.sortItems(field);
            });
        });
        
        // Удаление
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Удалить запись?')) {
                    storage.deleteItem(id);
                    this.showListPage();
                }
            });
        });
        
        this.showLoading(false);
    }

    showAddPage() {
        this.showLoading(true);
        
        document.getElementById('content').innerHTML = pages.renderAdd();
        
        // Обработчики событий
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showListPage();
        });
        
        document.getElementById('addForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });
        
        this.showLoading(false);
    }

    addItem() {
        // Валидация
        const name = document.getElementById('name').value.trim();
        const shelf = document.getElementById('shelf').value.trim();
        const weight = parseFloat(document.getElementById('weight').value);
        const storageTime = parseInt(document.getElementById('storageTime').value);
        
        let isValid = true;
        
        // Очистка ошибок
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        
        // Проверка полей
        if (!name) {
            document.getElementById('nameError').textContent = 'Введите название';
            isValid = false;
        }
        
        if (!shelf) {
            document.getElementById('shelfError').textContent = 'Введите полку';
            isValid = false;
        }
        
        if (!weight || weight <= 0) {
            document.getElementById('weightError').textContent = 'Введите корректный вес';
            isValid = false;
        }
        
        if (!storageTime || storageTime <= 0) {
            document.getElementById('storageTimeError').textContent = 'Введите корректное время хранения';
            isValid = false;
        }
        
        if (isValid) {
            storage.addItem({ name, shelf, weight, storageTime });
            this.showListPage();
        }
    }

    sortItems(field) {
        if (this.currentSort.field === field) {
            this.currentSort.ascending = !this.currentSort.ascending;
        } else {
            this.currentSort.field = field;
            this.currentSort.ascending = true;
        }
        
        let items = storage.getItems();
        
        items.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];
            
            // Для числовых полей
            if (field === 'weight' || field === 'storageTime') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            if (aVal < bVal) return this.currentSort.ascending ? -1 : 1;
            if (aVal > bVal) return this.currentSort.ascending ? 1 : -1;
            return 0;
        });
        
        // Временное сохранение для отображения
        localStorage.setItem('tempSorted', JSON.stringify(items));
        
        // Перерисовываем таблицу
        document.querySelector('table tbody').innerHTML = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.shelf}</td>
                <td>${item.weight}</td>
                <td>${item.storageTime}</td>
                <td>
                    <button class="deleteBtn" data-id="${item.id}">Удалить</button>
                </td>
            </tr>
        `).join('');
        
        // Обновляем обработчики удаления
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Удалить запись?')) {
                    storage.deleteItem(id);
                    this.showListPage();
                }
            });
        });
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
