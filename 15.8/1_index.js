// Массив фильмов
let movies = [];

// Загрузка при запуске
window.onload = function() {
    loadMovies();
    setupEvents();
    renderTable();
    console.log('Приложение загружено');
};

// Загрузка фильмов
function loadMovies() {
    const saved = localStorage.getItem('myMovies');
    if (saved) {
        movies = JSON.parse(saved);
    } else {
        // Начальные данные
        movies = [
            { id: 1, title: "Матрица: Революция", genre: "Фантастика", year: 2003, watched: true },
            { id: 2, title: "Гарри Поттер и философский камень", genre: "Фэнтези", year: 2001, watched: true },
            { id: 3, title: "Назад в будущее", genre: "Приключение", year: 1985, watched: true },
            { id: 4, title: "Интерстеллар", genre: "Фантастика", year: 2014, watched: false }
        ];
        saveMovies();
    }
}

// Сохранение
function saveMovies() {
    localStorage.setItem('myMovies', JSON.stringify(movies));
}

// Валидация
function validate() {
    let ok = true;
    
    // Очищаем ошибки
    document.getElementById('titleError').textContent = '';
    document.getElementById('genreError').textContent = '';
    document.getElementById('yearError').textContent = '';
    
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = document.getElementById('year').value;
    
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

// Добавление фильма
function addMovie() {
    if (!validate()) return;
    
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const watched = document.querySelector('input[name="watched"]:checked').value === 'yes';
    
    // Создаем ID
    const id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    
    movies.push({ id, title, genre, year, watched });
    saveMovies();
    renderTable();
    clearForm();
    
    console.log('Добавлен фильм:', title);
}

// Удаление фильма
function deleteMovie(id) {
    if (confirm('Удалить этот фильм?')) {
        movies = movies.filter(movie => movie.id !== id);
        saveMovies();
        renderTable();
        console.log('Удален фильм с ID:', id);
    }
}

// Удаление всех фильмов
function deleteAllMovies() {
    if (movies.length === 0) {
        alert('Нет фильмов для удаления');
        return;
    }
    
    if (confirm('Удалить ВСЕ фильмы? Это действие нельзя отменить.')) {
        movies = [];
        saveMovies();
        renderTable();
        console.log('Все фильмы удалены');
    }
}

// Фильтрация фильмов
function getFilteredMovies() {
    const search = document.getElementById('search').value.toLowerCase();
    const yearFrom = document.getElementById('yearFrom').value;
    const yearTo = document.getElementById('yearTo').value;
    const watchedFilter = document.getElementById('watchedFilter').value;
    
    return movies.filter(movie => {
        // Поиск по названию и жанру
        if (search && 
            !movie.title.toLowerCase().includes(search) && 
            !movie.genre.toLowerCase().includes(search)) {
            return false;
        }
        
        // Фильтр по году
        if (yearFrom && movie.year < parseInt(yearFrom)) return false;
        if (yearTo && movie.year > parseInt(yearTo)) return false;
        
        // Фильтр по просмотренности
        if (watchedFilter !== 'all') {
            const watched = watchedFilter === 'yes';
            if (movie.watched !== watched) return false;
        }
        
        return true;
    });
}

// Отрисовка таблицы
function renderTable() {
    const table = document.getElementById('moviesTable');
    const noMovies = document.getElementById('noMovies');
    const filtered = getFilteredMovies();
    
    if (filtered.length === 0) {
        table.innerHTML = '';
        noMovies.style.display = 'block';
        return;
    }
    
    noMovies.style.display = 'none';
    
    let html = '';
    filtered.forEach(movie => {
        html += `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>${movie.year}</td>
                <td>${movie.watched ? 'Да' : 'Нет'}</td>
                <td>
                    <button onclick="deleteMovie(${movie.id})" style="background:red; color:white;">Удалить</button>
                </td>
            </tr>
        `;
    });
    
    table.innerHTML = html;
}

// Очистка формы
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
    document.getElementById('watchedYes').checked = true;
    
    document.getElementById('titleError').textContent = '';
    document.getElementById('genreError').textContent = '';
    document.getElementById('yearError').textContent = '';
}

// Очистка фильтров
function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('yearFrom').value = '';
    document.getElementById('yearTo').value = '';
    document.getElementById('watchedFilter').value = 'all';
    renderTable();
    console.log('Фильтры очищены');
}

// Настройка событий
function setupEvents() {
    // Добавление фильма
    document.getElementById('addBtn').addEventListener('click', addMovie);
    
    // Удаление всех
    document.getElementById('deleteAll').addEventListener('click', deleteAllMovies);
    
    // Очистка фильтров
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    // Фильтрация при изменении
    document.getElementById('search').addEventListener('input', renderTable);
    document.getElementById('yearFrom').addEventListener('input', renderTable);
    document.getElementById('yearTo').addEventListener('input', renderTable);
    document.getElementById('watchedFilter').addEventListener('change', renderTable);
    
    // Enter в форме
    document.getElementById('movieForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMovie();
        }
    });
}
