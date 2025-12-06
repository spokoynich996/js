// Исходный массив цен
let prices = [100, 500, 250, 750, 300];
const priceList = document.getElementById('priceList');
const sortAsc = document.getElementById('sortAsc');
const sortDesc = document.getElementById('sortDesc');

// Функция отображения цен
function displayPrices(pricesArray) {
    priceList.innerHTML = '';
    
    pricesArray.forEach(price => {
        const li = document.createElement('li');
        li.textContent = price;
        priceList.appendChild(li);
    });
}

// Сортировка по возрастанию
sortAsc.addEventListener('click', function() {
    prices.sort((a, b) => a - b);
    displayPrices(prices);
    console.log('Отсортировано по возрастанию:', prices);
});

// Сортировка по убыванию
sortDesc.addEventListener('click', function() {
    prices.sort((a, b) => b - a);
    displayPrices(prices);
    console.log('Отсортировано по убыванию:', prices);
});

// Инициализация
displayPrices(prices);
console.log('Массив цен загружен:', prices);
