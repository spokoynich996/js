// Исходный массив с товарами
const products = ["Мышка", "Клавиатура", "Наушники"];

// Новые товары, которые нужно добавить
const newProducts = ["Монитор", "Принтер", "Флешка"];

// 1. Добавляем новые товары в массив products
for (let i = 0; i < newProducts.length; i++) {
    products.push(newProducts[i]);
}

// 2. Находим элемент ul на странице
const productsList = document.querySelector('.products');

// 3. Создаем и добавляем элементы списка для каждого товара
for (let i = 0; i < products.length; i++) {
    // Создаем элемент li
    const listItem = document.createElement('li');
    
    // Добавляем текст товара
    listItem.textContent = products[i];
    
    // Добавляем li в ul
    productsList.appendChild(listItem);
}
