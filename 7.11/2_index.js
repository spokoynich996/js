// Начальный список роста учеников
let heights = [145, 152, 160, 168, 175, 182, 155, 163, 170];

// Находим элементы на странице
const heightList = document.getElementById('heightList');
const addHeightBtn = document.getElementById('addHeightBtn');
const filterBtn = document.getElementById('filterBtn');

// Функция для отображения роста
function displayHeights(heightsToShow = heights) {
    heightList.innerHTML = ''; // Очищаем список
    
    if (heightsToShow.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Нет данных';
        heightList.appendChild(li);
        return;
    }
    
    heightsToShow.forEach((height, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}) ${height} см`;
        heightList.appendChild(li);
    });
}

// Функция для добавления роста
function addHeight() {
    const heightInput = prompt('Введите рост ученика (в см):');
    
    if (heightInput === null) return; // Нажата отмена
    
    if (heightInput.trim() === '') {
        alert('Рост не введён!');
        return;
    }
    
    const height = Number(heightInput);
    
    if (isNaN(height) || height <= 0) {
        alert('Введите корректное число!');
        return;
    }
    
    heights.push(height);
    displayHeights();
}

// Функция для фильтрации
function filterHeights() {
    const minHeightInput = prompt('Введите минимальный рост для фильтрации:');
    
    if (minHeightInput === null) return;
    
    if (minHeightInput.trim() === '') {
        // Если ничего не введено, показываем весь список
        displayHeights();
        return;
    }
    
    const minHeight = Number(minHeightInput);
    
    if (isNaN(minHeight)) {
        alert('Введите корректное число!');
        return;
    }
    
    // Фильтруем массив
    const filteredHeights = heights.filter(height => height >= minHeight);
    displayHeights(filteredHeights);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayHeights();
    
    addHeightBtn.addEventListener('click', addHeight);
    filterBtn.addEventListener('click', filterHeights);
});
