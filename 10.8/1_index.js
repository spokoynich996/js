// Функция для отображения изображения
function showImage(imageSrc, altText) {
    const fullImageDiv = document.getElementById('fullImage');
    
    // Создаем объект Image для проверки загрузки
    const testImage = new Image();
    
    testImage.onload = function() {
        // Если изображение загрузилось
        fullImageDiv.innerHTML = `<img src="${imageSrc}" alt="${altText}" style="max-width: 100%; max-height: 400px;">`;
        console.log(`Показано: ${imageSrc}`);
    };
    
    testImage.onerror = function() {
        // Если изображение не найдено
        fullImageDiv.innerHTML = `
            <div style="color: red; padding: 20px;">
                <p><strong>Ошибка:</strong> файл "${imageSrc}" не найден</p>
                <p>Проверьте:</p>
                <ol>
                    <li>Файл находится в той же папке, что и HTML</li>
                    <li>Имя файла написано правильно: "${imageSrc}"</li>
                    <li>Файл имеет расширение .jpg</li>
                </ol>
                <p>Или используйте тестовые изображения:</p>
                <button onclick="useTestImages()">Использовать тестовые изображения</button>
            </div>
        `;
        console.error(`Файл не найден: ${imageSrc}`);
    };
    
    testImage.src = imageSrc;
}

// Функция для использования тестовых изображений (если свои не работают)
function useTestImages() {
    const thumbs = document.querySelectorAll('.thumb');
    
    // Тестовые изображения с Picsum
    const testImages = [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2', 
        'https://picsum.photos/400/300?random=3'
    ];
    
    // Обновляем миниатюры
    thumbs.forEach((thumb, index) => {
        const img = thumb.querySelector('img');
        img.src = `https://picsum.photos/150/100?random=${index + 1}`;
    });
    
    // Обновляем обработчики кликов
    thumbs[0].setAttribute('onclick', "showImage('https://picsum.photos/400/300?random=1', 'Тестовое изображение 1')");
    thumbs[1].setAttribute('onclick', "showImage('https://picsum.photos/400/300?random=2', 'Тестовое изображение 2')");
    thumbs[2].setAttribute('onclick', "showImage('https://picsum.photos/400/300?random=3', 'Тестовое изображение 3')");
    
    // Показываем первое изображение
    showImage('https://picsum.photos/400/300?random=1', 'Тестовое изображение 1');
    
    console.log('Используются тестовые изображения');
}

// Проверяем миниатюры при загрузке
window.onload = function() {
    console.log("Галерея загружена");
    
    // Проверяем загрузку миниатюр
    document.querySelectorAll('.thumb img').forEach(img => {
        img.onerror = function() {
            console.warn(`Не удалось загрузить: ${this.src}`);
        };
    });
};
