import { storage } from './storage.js';

export const pages = {
    // Страница списка
    renderList() {
        const items = storage.getItems();
        
        return `
            <h1>Склад</h1>
            <button id="addBtn">Добавить запись</button>
            
            ${items.length === 0 ? 
                '<p>Нет записей</p>' : 
                this.renderTable(items)
            }
        `;
    },

    renderTable(items) {
        return `
            <table>
                <thead>
                    <tr>
                        <th data-sort="name">Название</th>
                        <th data-sort="shelf">Полка</th>
                        <th data-sort="weight">Вес</th>
                        <th data-sort="storageTime">Время хранения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.shelf}</td>
                            <td>${item.weight}</td>
                            <td>${item.storageTime}</td>
                            <td>
                                <button class="deleteBtn" data-id="${item.id}">Удалить</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    // Страница добавления
    renderAdd() {
        return `
            <h1>Добавить запись</h1>
            <button id="backBtn">Назад</button>
            
            <form id="addForm">
                <div class="form-group">
                    <label>Название:</label>
                    <input type="text" id="name" required>
                    <div class="error" id="nameError"></div>
                </div>
                
                <div class="form-group">
                    <label>Полка:</label>
                    <input type="text" id="shelf" required>
                    <div class="error" id="shelfError"></div>
                </div>
                
                <div class="form-group">
                    <label>Вес:</label>
                    <input type="number" id="weight" step="0.01" required>
                    <div class="error" id="weightError"></div>
                </div>
                
                <div class="form-group">
                    <label>Время хранения:</label>
                    <input type="number" id="storageTime" required>
                    <div class="error" id="storageTimeError"></div>
                </div>
                
                <button type="submit">Добавить</button>
            </form>
        `;
    }
};
