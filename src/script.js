import { v4 as uuidv4 } from 'uuid';

const books = [
    { id: uuidv4(), title: 'Cien años de soledad', author: 'Gabriel García Márquez', available: true },
    { id: uuidv4(), title: '1984', author: 'George Orwell', available: true },
    { id: uuidv4(), title: 'Orgullo y prejuicio', author: 'Jane Austen', available: true }
];

let loans = [];

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const nav = document.querySelector('nav');

    function loadSection(section) {
        contentDiv.innerHTML = ''; // Clear existing content
        switch (section) {
            case 'catalog':
                contentDiv.appendChild(createCatalogSection());
                break;
            case 'borrow':
                contentDiv.appendChild(createBorrowSection());
                break;
            case 'return':
                contentDiv.appendChild(createReturnSection());
                break;
            case 'manage':
                contentDiv.appendChild(createManageSection());
                break;
            default:
                contentDiv.textContent = 'Section not found.';
        }
    }

    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const section = event.target.dataset.section;
            loadSection(section);
        }
    });

    // Load the catalog section by default
    loadSection('catalog');

    // --- Section Creation Functions ---
    function createCatalogSection() {
        const section = document.createElement('div');
        section.classList.add('catalog-section');

        const title = document.createElement('h2');
        title.textContent = 'Catálogo de Libros';
        section.appendChild(title);

        const table = document.createElement('table');
        table.classList.add('book-table');

        // Table headers
        const headerRow = document.createElement('tr');
        const headers = ['Título', 'Autor', 'Disponibilidad'];
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);

        // Table rows
        books.forEach(book => {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const availableCell = document.createElement('td');
            availableCell.textContent = book.available ? 'Sí' : 'No';
            row.appendChild(availableCell);

            table.appendChild(row);
        });

        section.appendChild(table);
        return section;
    }

    function createBorrowSection() {
        const section = document.createElement('div');
        section.classList.add('borrow-section');

        const title = document.createElement('h2');
        title.textContent = 'Préstamo de Libros';
        section.appendChild(title);

        const form = document.createElement('form');

        const bookLabel = document.createElement('label');
        bookLabel.textContent = 'Título del Libro:';
        form.appendChild(bookLabel);

        const bookSelect = document.createElement('select');
        books.forEach(book => {
            if (book.available) {
                const option = document.createElement('option');
                option.value = book.id;
                option.textContent = book.title;
                bookSelect.appendChild(option);
            }
        });
        form.appendChild(bookSelect);

        const userLabel = document.createElement('label');
        userLabel.textContent = 'Nombre del Usuario:';
        form.appendChild(userLabel);

        const userInput = document.createElement('input');
        userInput.type = 'text';
        userInput.name = 'user';
        form.appendChild(userInput);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Prestar Libro';
        form.appendChild(submitButton);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const bookId = bookSelect.value;
            const user = userInput.value;
            if (bookId && user) {
                borrowBook(bookId, user);
                loadSection('borrow'); // Refresh the borrow section
            } else {
                alert('Por favor, selecciona un libro e introduce un nombre de usuario.');
            }
        });

        section.appendChild(form);
        return section;
    }

    function createReturnSection() {
        const section = document.createElement('div');
        section.classList.add('return-section');

        const title = document.createElement('h2');
        title.textContent = 'Devolución de Libros';
        section.appendChild(title);

        const form = document.createElement('form');

        const bookLabel = document.createElement('label');
        bookLabel.textContent = 'Título del Libro:';
        form.appendChild(bookLabel);

         const bookSelect = document.createElement('select');
        loans.forEach(loan => {
            const book = books.find(book => book.id === loan.bookId);
            if (book) {
                const option = document.createElement('option');
                option.value = loan.bookId;
                option.textContent = book.title + ' - ' + loan.user;
                bookSelect.appendChild(option);
            }
        });
        form.appendChild(bookSelect);


        const submitButton = document.createElement('button');
        submitButton.textContent = 'Devolver Libro';
        form.appendChild(submitButton);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const bookId = bookSelect.value;
            if (bookId) {
                returnBook(bookId);
                loadSection('return'); // Refresh the return section
            } else {
                alert('Por favor, selecciona un libro a devolver.');
            }
        });

        section.appendChild(form);
        return section;
    }

    function createManageSection() {
        const section = document.createElement('div');
        section.classList.add('manage-section');

        const title = document.createElement('h2');
        title.textContent = 'Gestión de Libros';
        section.appendChild(title);

        // Add Book Form
        const addBookForm = document.createElement('form');
        addBookForm.innerHTML = `
            <h3>Añadir Libro</h3>
            <label>Título:</label>
            <input type="text" id="add-title" required><br>
            <label>Autor:</label>
            <input type="text" id="add-author" required><br>
            <button type="submit">Añadir</button>
        `;
        addBookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('add-title').value;
            const author = document.getElementById('add-author').value;
            addBook(title, author);
            document.getElementById('add-title').value = '';
            document.getElementById('add-author').value = '';
            loadSection('manage'); // Refresh the manage section
        });
        section.appendChild(addBookForm);

        // Remove Book Form
         const removeBookForm = document.createElement('form');
        removeBookForm.innerHTML = `
            <h3>Eliminar Libro</h3>
            <label>Título:</label>
             <select id="remove-title"></select><br>
            <button type="submit">Eliminar</button>
        `;

        // Populate the select element with book titles
        const removeTitleSelect = removeBookForm.querySelector('#remove-title');
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = book.title;
            removeTitleSelect.appendChild(option);
        });


        removeBookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const bookId = document.getElementById('remove-title').value;
            removeBook(bookId);
            loadSection('manage'); // Refresh the manage section
        });
        section.appendChild(removeBookForm);


        return section;
    }


    // --- Library Functionality ---
    function borrowBook(bookId, user) {
        const book = books.find(book => book.id === bookId);
        if (book && book.available) {
            book.available = false;
            loans.push({ bookId: bookId, user: user, loanDate: new Date() });
            alert(`Libro "${book.title}" prestado a ${user}.`);
        } else {
            alert('Libro no disponible para préstamo.');
        }
    }

    function returnBook(bookId) {
        const book = books.find(book => book.id === bookId);
        if (book) {
            book.available = true;
            loans = loans.filter(loan => loan.bookId !== bookId);
            alert(`Libro "${book.title}" devuelto.`);
        } else {
            alert('Libro no encontrado.');
        }
    }

    function addBook(title, author) {
        const newBook = { id: uuidv4(), title: title, author: author, available: true };
        books.push(newBook);
        alert(`Libro "${title}" añadido.`);
    }

    function removeBook(bookId) {
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            const book = books[bookIndex];
            books.splice(bookIndex, 1);
            loans = loans.filter(loan => loan.bookId !== bookId); // Remove any loans
            alert(`Libro "${book.title}" eliminado.`);
        } else {
            alert('Libro no encontrado.');
        }
    }


});

