// Объект с промокодом
const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%"
};

// Вспомогательная функция для получения данных из куки
function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc;
    }, {});
}

// Находим элементы
const form = document.getElementById('promoForm');
const promoInput = document.getElementById('promoInput');
const messageDiv = document.getElementById('message');

// Проверяем сохраненный промокод при загрузке
window.onload = function() {
    const cookies = getCookie();
    const savedPromo = cookies.promocode;
    
    if (savedPromo && savedPromo === promocodeObj.promocode) {
        // Активируем сохраненный промокод
        activatePromocode(savedPromo);
        console.log('Восстановлен промокод из cookie:', savedPromo);
    }
};

// Обработка отправки формы
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const enteredPromo = promoInput.value.trim().toUpperCase();
    
    if (enteredPromo === promocodeObj.promocode) {
        // Активация промокода
        activatePromocode(enteredPromo);
        
        // Сохраняем в cookie (на 7 дней)
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = `promocode=${enteredPromo}; expires=${date.toUTCString()}; path=/`;
        
        console.log('Промокод активирован и сохранен в cookie');
    } else {
        // Неверный промокод
        deactivatePromocode();
        console.log('Неверный промокод:', enteredPromo);
    }
});

// Функция активации промокода
function activatePromocode(promo) {
    form.classList.add('success');
    messageDiv.innerHTML = `<div class="successMsg">Промокод "${promo}" активирован! Ваш подарок: ${promocodeObj.gift}</div>`;
    promoInput.value = promo;
}

// Функция деактивации промокода
function deactivatePromocode() {
    form.classList.remove('success');
    messageDiv.innerHTML = '';
}
