// Начальный список товаров (отсортированный)
let products = ["Арбуз", "Книга", "Кофе", "Макароны", "Молоко", "Сахар", "Яблоки"].sort();

// Находим элементы на странице
const productList = document.getElementById('productList');
const addProductBtn = document.getElementById('addProductBtn');

// Функция для отображения товаров
function displayProducts() {
    productList.innerHTML = ''; // Очищаем список
    
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}) ${product}`;
        productList.appendChild(li);
    });
}

// Функция для добавления товара
function addProduct() {
    const productName = prompt('Введите название товара:');
    
    if (productName === null) return; // Нажата отмена
    
    if (productName.trim() === '') {
        alert('Название товара не введено!');
        return;
    }
    
    // Добавляем товар
    products.push(productName.trim());
    
    // Сортируем массив
    products.sort();
    
    // Обновляем отображение
    displayProducts();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    addProductBtn.addEventListener('click', addProduct);
});
