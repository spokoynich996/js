// Функция для отображения изображения в полном размере
function showImage(imageSrc) {
    const fullImageDiv = document.getElementById('fullImage');
    
    // Проверяем, существует ли файл
    const img = new Image();
    img.onload = function() {
        // Если изображение загрузилось
        fullImageDiv.innerHTML = `<img src="${imageSrc}" alt="Большое изображение">`;
        console.log(`Показано: ${imageSrc}`);
    };
    
    img.onerror = function() {
        // Если изображение не найдено
        fullImageDiv.innerHTML = `
            <div style="color: red;">
                <p>Ошибка: файл "${imageSrc}" не найден</p>
                <p>Убедитесь, что файл находится в той же папке</p>
            </div>
        `;
        console.error(`Файл не найден: ${imageSrc}`);
    };
    
    img.src = imageSrc;
}

// Проверяем миниатюры при загрузке страницы
window.onload = function() {
    console.log("Галерея загружена");
    
    // Добавляем обработчики ошибок для миниатюр
    document.querySelectorAll('.thumb img').forEach(img => {
        img.onerror = function() {
            this.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9IiNjY2MiPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+";
            this.alt = "Изображение не найдено";
        };
    });
};
