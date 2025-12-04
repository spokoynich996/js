// Массив чисел
const numbers = [12, 5, 8, 20, 3, 16];

// Находим все элементы на странице
const allElementsParagraph = document.querySelector('.all-elements');
const minButton = document.querySelector('.min');
const maxButton = document.querySelector('.max');
const minNumberSpan = document.querySelector('.minNumber');
const maxNumberSpan = document.querySelector('.maxNumber');

// Функция для отображения всех элементов массива
function displayAllElements() {
    let result = '';
    
    // Цикл for для перебора массива
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i];
        if (i < numbers.length - 1) {
            result += ', ';
        }
    }
    
    // Выводим результат на страницу
    allElementsParagraph.textContent = result;
}

// Функция для нахождения минимального числа
function findMinNumber() {
    let min = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    
    minNumberSpan.textContent = min;
}

// Функция для нахождения максимального числа
function findMaxNumber() {
    let max = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    maxNumberSpan.textContent = max;
}

// Добавляем обработчики событий на кнопки
minButton.addEventListener('click', findMinNumber);
maxButton.addEventListener('click', findMaxNumber);

// При загрузке страницы показываем все элементы
displayAllElements();
