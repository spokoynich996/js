// Массив подарков
const giftArr = [
    {
        title: "Скидка 26% на первую покупку в нашем магазине!",
        icon: "/img/discount.svg"
    },
    {
        title: "Скидка 16% на всё!",
        icon: "/img/discount_2.svg"
    },
    {
        title: "Подарок при первой покупке в нашем магазине!",
        icon: "/img/gift.svg"
    },
    {
        title: "Бесплатная доставка для вас!",
        icon: "/img/delivery.svg"
    },
    {
        title: "Сегодня день больших скидок!",
        icon: "/img/discount_3.svg"
    }
];

// Показываем попап через 3 секунды
setTimeout(showPopup, 3000);

function showPopup() {
    // Выбираем случайный подарок
    const randomIndex = Math.floor(Math.random() * giftArr.length);
    const gift = giftArr[randomIndex];
    
    // Находим элементы
    const popup = document.getElementById('popup');
    const giftTitle = document.getElementById('giftTitle');
    const closeBtn = document.getElementById('closeBtn');
    
    // Заполняем данные
    giftTitle.textContent = gift.title;
    
    // Показываем попап
    popup.style.display = 'block';
    
    // Добавляем обработчик закрытия
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        console.log('Попап закрыт');
    });
    
    console.log('Показан подарок:', gift.title);
}

console.log('Задание 1 загружено');
