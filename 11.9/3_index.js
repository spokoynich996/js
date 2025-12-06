const cardTextInput = document.getElementById('cardText');
const cardColorSelect = document.getElementById('cardColor');
const cardElement = document.getElementById('card');

// Обновление текста при вводе
cardTextInput.addEventListener('input', function() {
    cardElement.textContent = this.value || 'Ваш текст здесь';
    console.log('Текст изменен:', this.value);
});

// Изменение цвета карты
cardColorSelect.addEventListener('change', function() {
    const color = this.value;
    cardElement.style.backgroundColor = color;
    console.log('Цвет изменен:', color);
});

// Событие focus (получение фокуса)
cardTextInput.addEventListener('focus', function() {
    this.style.border = '2px solid blue';
    this.style.backgroundColor = '#f0f8ff';
    console.log('Поле ввода получило фокус');
});

// Событие blur (потеря фокуса)
cardTextInput.addEventListener('blur', function() {
    this.style.border = '';
    this.style.backgroundColor = '';
    console.log('Поле ввода потеряло фокус');
});

// Инициализация
console.log('Дизайнер карт загружен');
