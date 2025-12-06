// Находим элементы
const itemList = document.getElementById('itemList');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const counter = document.getElementById('counter');

// Начальное количество
let itemCount = 4;

// Функция обновления счетчика
function updateCounter() {
    counter.textContent = `Всего элементов: ${itemCount}`;
    
    // Блокируем кнопку удаления если список пуст
    removeBtn.disabled = itemCount === 0;
}

// Добавление элемента
addBtn.addEventListener('click', function() {
    const newItem = document.createElement('li');
    newItem.textContent = 'Новый элемент списка';
    itemList.appendChild(newItem);
    
    itemCount++;
    updateCounter();
    console.log('Элемент добавлен');
});

// Удаление элемента
removeBtn.addEventListener('click', function() {
    if (itemCount > 0) {
        const lastItem = itemList.lastElementChild;
        if (lastItem) {
            itemList.removeChild(lastItem);
            itemCount--;
            updateCounter();
            console.log('Элемент удален');
        }
    }
});

// Инициализация
updateCounter();
console.log('Список загружен');
