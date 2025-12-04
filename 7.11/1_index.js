// Начальный список книг
let books = ["Мастер и Маргарита", "Гарри Поттер", "За пропастью во ржи", 
             "Властелин колец", "Дюна", "Отцы и дети"];

// Находим элементы на странице
const bookList = document.getElementById('bookList');
const addBookBtn = document.getElementById('addBookBtn');
const searchBookBtn = document.getElementById('searchBookBtn');

// Функция для отображения книг
function displayBooks() {
    bookList.innerHTML = ''; // Очищаем список
    
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}) ${book}`;
        bookList.appendChild(li);
    });
}

// Функция для добавления книги
function addBook() {
    const bookName = prompt('Введите название книги:');
    
    if (bookName === null) return; // Нажата отмена
    
    if (bookName.trim() === '') {
        alert('Название книги не введено!');
        return;
    }
    
    books.push(bookName);
    displayBooks();
}

// Функция для поиска книги
function searchBook() {
    // Сначала убираем выделение со всех книг
    const allBooks = bookList.querySelectorAll('li');
    allBooks.forEach(book => {
        book.classList.remove('book-found');
    });
    
    const searchName = prompt('Введите название книги для поиска:');
    
    if (searchName === null) return;
    
    if (searchName.trim() === '') {
        alert('Введите название для поиска!');
        return;
    }
    
    // Ищем книгу
    const foundIndex = books.findIndex(book => 
        book.toLowerCase().includes(searchName.toLowerCase())
    );
    
    if (foundIndex !== -1) {
        // Выделяем найденную книгу
        const foundBook = bookList.querySelectorAll('li')[foundIndex];
        foundBook.classList.add('book-found');
        
        // Прокручиваем к найденной книге
        foundBook.scrollIntoView({behavior: 'smooth'});
    } else {
        alert('Книга не найдена!');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    
    addBookBtn.addEventListener('click', addBook);
    searchBookBtn.addEventListener('click', searchBook);
});
