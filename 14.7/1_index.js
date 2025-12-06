// Массив фильмов
let movies = [];
let editingIndex = null;

// Загрузка из localStorage
function loadMovies() {
    const saved = localStorage.getItem('movies');
    if (saved) {
        movies = JSON.parse(saved);
    } else {
        // Начальные данные
        movies = [
            { title: "Назад в будущее", genre: "Приключение", year: 1985, watched: true },
            { title: "Матрица", genre: "Киберпанк", year: 1999, watched: false }
        ];
        saveMovies();
    }
}

// Сохранение в localStorage
function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Валидация формы
function validateForm() {
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = document.getElementById('year').value;
    
    let ok = true;
    
    // Очищаем ошибки
    document.getElementById('titleError').textContent = '';
    document.getElementById('genreError').textContent = '';
    document.getElementById('yearError').textContent = '';
    
    // Проверки
    if (!title) {
        document.getElementById('titleError').textContent = 'Введите название';
        ok = false;
    }
    if (!genre) {
        document.getElementById('genreError').textContent = 'Введите жанр';
        ok = false;
    }
    if (!year || year < 1900 || year > 2024) {
        document.getElementById('yearError').textContent = 'Введите год 1900-2024';
        ok = false;
    }
    
    return ok;
}

// Показать фильмы в таблице
function showMovies() {
    const tbody = document.getElementById('moviesTableBody');
    tbody.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>${movie.watched ? 'Да' : 'Нет'}</td>
            <td>
                <button onclick="editMovie(${index})">Редактировать</button>
                <button onclick="deleteMovie(${index})">Удалить</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Обновляем счетчик
    document.getElementById('movieCount').textContent = `Всего фильмов: ${movies.length}`;
}

// Добавить фильм
function addMovie() {
    if (!validateForm()) return;
    
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const watched = document.querySelector('input[name="watched"]:checked').value === 'yes';
    
    movies.push({ title, genre, year, watched });
    saveMovies();
    showMovies();
    clearForm();
    console.log('Добавлен:', title);
}

// Начать редактирование
function editMovie(index) {
    const movie = movies[index];
    
    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('year').value = movie.year;
    
    if (movie.watched) {
        document.getElementById('watchedYes').checked = true;
    } else {
        document.getElementById('watchedNo').checked = true;
    }
    
    editingIndex = index;
    
    // Показываем кнопки редактирования
    document.getElementById('addBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'inline';
    document.getElementById('cancelBtn').style.display = 'inline';
    
    console.log('Редактируем:', movie.title);
}

// Обновить фильм
function updateMovie() {
    if (!validateForm()) return;
    
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const watched = document.querySelector('input[name="watched"]:checked').value === 'yes';
    
    movies[editingIndex] = { title, genre, year, watched };
    saveMovies();
    showMovies();
    cancelEdit();
    
    console.log('Обновлен:', title);
}

// Отменить редактирование
function cancelEdit() {
    editingIndex = null;
    clearForm();
    
    document.getElementById('addBtn').style.display = 'inline';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
    
    console.log('Редактирование отменено');
}

// Удалить фильм
function deleteMovie(index) {
    if (confirm(`Удалить "${movies[index].title}"?`)) {
        movies.splice(index, 1);
        saveMovies();
        showMovies();
        console.log('Удален фильм');
    }
}

// Сортировка
function sortMovies() {
    const sortBy = document.getElementById('sortSelect').value;
    
    movies.sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'genre') return a.genre.localeCompare(b.genre);
        if (sortBy === 'year') return a.year - b.year;
        return 0;
    });
    
    showMovies();
    console.log('Отсортировано по', sortBy);
}

// Очистить форму
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
    document.getElementById('watchedYes').checked = true;
    
    document.getElementById('titleError').textContent = '';
    document.getElementById('genreError').textContent = '';
    document.getElementById('yearError').textContent = '';
    
    console.log('Форма очищена');
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    showMovies();
    
    // Кнопки
    document.getElementById('addBtn').addEventListener('click', addMovie);
    document.getElementById('updateBtn').addEventListener('click', updateMovie);
    document.getElementById('cancelBtn').addEventListener('click', cancelEdit);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    
    // Сортировка
    document.getElementById('sortSelect').addEventListener('change', sortMovies);
    
    // Enter в форме
    document.getElementById('movieForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (editingIndex !== null) {
                updateMovie();
            } else {
                addMovie();
            }
        }
    });
    
    console.log('Приложение загружено');
});
