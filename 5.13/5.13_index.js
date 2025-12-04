// Функция для добавления товара в корзину
function addToCart(productName) {
    // 1. Находим контейнер корзины
    const cartElement = document.getElementById('cart');
    
    // 2. Проверяем, не добавлен ли уже этот товар
    const existingItems = cartElement.querySelectorAll('li');
    for (let item of existingItems) {
        if (item.textContent === productName) {
            alert('Этот товар уже в корзине!');
            return;
        }
    }
    
    // 3. Создаем новый элемент списка (li)
    const newItem = document.createElement('li');
    
    // 4. Создаем текстовый узел с названием товара
    const textNode = document.createTextNode(productName);
    
    // 5. Добавляем текстовый узел в элемент списка
    newItem.appendChild(textNode);
    
    // 6. Можно добавить класс для стилизации
    newItem.classList.add('cart-item');
    
    // 7. Добавляем элемент в корзину
    cartElement.appendChild(newItem);
    
    // 8. (Дополнительно) Показываем сообщение в консоли
    console.log(`Товар "${productName}" добавлен в корзину!`);
}
