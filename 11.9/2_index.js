const form = document.getElementById('deliveryForm');
const tableBody = document.querySelector('#productTable tbody');

// Валидация и добавление товара
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Очищаем ошибки
    clearErrors();
    
    // Получаем значения
    const name = document.getElementById('productName').value.trim();
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    
    // Валидация
    let isValid = true;
    
    if (!name || name.length < 2) {
        document.getElementById('nameError').textContent = 'Введите название товара';
        isValid = false;
    }
    
    if (!weight || weight <= 0) {
        document.getElementById('weightError').textContent = 'Введите корректный вес';
        isValid = false;
    }
    
    if (!distance || distance <= 0) {
        document.getElementById('distanceError').textContent = 'Введите корректное расстояние';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Расчет стоимости
    const cost = (weight * distance) / 20;
    
    // Добавляем строку в таблицу
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${weight.toFixed(1)}</td>
        <td>${distance}</td>
        <td>${cost.toFixed(2)} руб.</td>
    `;
    tableBody.appendChild(row);
    
    // Очищаем форму
    form.reset();
    
    console.log(`Товар добавлен: ${name}, вес: ${weight}кг, расстояние: ${distance}км, стоимость: ${cost.toFixed(2)}руб.`);
});

// Очистка ошибок
function clearErrors() {
    document.querySelectorAll('.error').forEach(span => {
        span.textContent = '';
    });
}
