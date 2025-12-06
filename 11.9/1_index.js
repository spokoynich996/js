const form = document.getElementById('surveyForm');
const resultDiv = document.getElementById('result');
const resultContent = document.getElementById('resultContent');
const ratingInput = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Обновление значения ползунка
ratingInput.addEventListener('input', function() {
    ratingValue.textContent = this.value;
});

// Валидация формы
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Очищаем предыдущие ошибки
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    
    // Получаем значения
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const rating = ratingInput.value;
    const comments = document.getElementById('comments').value.trim();
    
    // Валидация имени
    if (!name) {
        document.getElementById('nameError').textContent = 'Имя обязательно';
        return;
    }
    
    // Валидация email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Некорректный email';
        return;
    }
    
    // Получаем выбранные интересы
    const interests = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        interests.push(cb.value);
    });
    
    // Формируем результат
    let resultHTML = `
        <strong>Имя:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Пол:</strong> ${gender === 'male' ? 'Мужской' : 'Женский'}<br>
        <strong>Оценка сервиса:</strong> ${rating}/10<br>
    `;
    
    if (interests.length > 0) {
        resultHTML += `<strong>Интересы:</strong> ${interests.join(', ')}<br>`;
    }
    
    if (comments) {
        resultHTML += `<strong>Комментарии:</strong> ${comments}`;
    }
    
    // Показываем результат
    resultContent.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    
    console.log('Данные отправлены:', {name, email, gender, rating, interests, comments});
});
