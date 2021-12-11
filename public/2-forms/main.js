(function () {
  // TODO (hub33k): use classes?
  // TODO (hub33k): disable button when inputs are invalid

  // Render book list
  // ================================================================

  const $bookList = document.getElementById('list');

  $bookList.innerHTML = template(getBooksFromLocalStorage());

  // Handle forms
  // ================================================================

  const $form = document.querySelector('#form');

  const $titleInput = $form.elements.title;
  const $authorInput = $form.elements.author;
  const $priorityInput = $form.elements.priority;
  const $categorySelect = $form.elements.category;
  const $submitButton = $form.elements.submit;

  const $errors = document.querySelectorAll('.error');
  const $validIcons = document.querySelectorAll('.valid-icon');
  const $invalidIcons = document.querySelectorAll('.invalid-icon');

  const isInputValid = {
    title: false,
    author: false,
    priority: false,
  };

  $titleInput.addEventListener('blur', () => {
    validateTitle();
  });
  $authorInput.addEventListener('blur', () => {
    validateAuthor();
  });
  $priorityInput.addEventListener('blur', () => {
    validatePriority();
  });

  $form.addEventListener('submit', (event) => {
    event.preventDefault();

    validateTitle();
    validateAuthor();
    validatePriority();

    if (isInputValid.title && isInputValid.author && isInputValid.priority) {
      const book = {
        title: $titleInput.value,
        author: $authorInput.value,
        priority: $priorityInput.value,
        category: $categorySelect.value,
      };

      setBooksToLocalStorage(book);
      $bookList.innerHTML = template(getBooksFromLocalStorage());

      // Reset form values
      $titleInput.value = '';
      $authorInput.value = '';
      $priorityInput.value = 1;
      $categorySelect.value = 'action';

      $errors.forEach((item) => {
        item.innerHTML = '';
      });
      $validIcons.forEach((item) => {
        item.style.display = 'none';
      });
      $invalidIcons.forEach((item) => {
        item.style.display = 'none';
      });

      $titleInput.focus();
    }
  });

  // Validators
  // ================================

  function validateTitle() {
    const value = $titleInput.value.trim();
    const inputIndex = 0;

    if (value.length && value.length >= 1) {
      $errors[inputIndex].innerHTML = '';
      showIcons(inputIndex, true);
      isInputValid.title = true;
      return true;
    } else {
      $errors[inputIndex].innerHTML =
        'Title should have at least one character.';
      showIcons(inputIndex, false);
      isInputValid.title = false;
      return false;
    }
  }
  function validateAuthor() {
    const value = $authorInput.value.trim();
    const inputIndex = 1;

    if (value.length && value.length >= 3) {
      $errors[inputIndex].innerHTML = '';
      showIcons(inputIndex, true);
      isInputValid.author = true;
      return true;
    } else {
      $errors[inputIndex].innerHTML =
        'Author should have at least three characters.';
      showIcons(inputIndex, false);
      isInputValid.author = false;
      return false;
    }
  }
  function validatePriority() {
    const value = $priorityInput.value.trim();
    const inputIndex = 2;

    if (value.length && value >= 1 && value <= 5) {
      $errors[inputIndex].innerHTML = '';
      showIcons(inputIndex, true);
      isInputValid.priority = true;
      return true;
    } else {
      $errors[inputIndex].innerHTML = 'Priority should be from 1 to 5.';
      showIcons(inputIndex, false);
      isInputValid.priority = false;
      return false;
    }
  }

  // Helpers
  // ================================

  function showIcons(inputIndex, isValid) {
    if (isValid) {
      $invalidIcons[inputIndex].style.display = 'none';
      $validIcons[inputIndex].style.display = 'inline-block';
    } else {
      $invalidIcons[inputIndex].style.display = 'inline-block';
      $validIcons[inputIndex].style.display = 'none';
    }
  }

  function template(booksArray) {
    if (!Array.isArray(booksArray)) return '';

    return `
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Priority</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
           ${booksArray
             .map(
               (book, id) => `
                <tr>
                  <td>${id + 1}</td>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.priority}</td>
                  <td>${book.category}</td>
                </tr>`,
             )
             .join('')}
           </tbody>
      </table>
    `;
  }

  // Local storage
  // ================================================================

  function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('books'));
  }
  function setBooksToLocalStorage(book) {
    const books = [];

    books.push(book);

    if (localStorage.getItem('books')) {
      const newBooks = books.concat(getBooksFromLocalStorage());
      localStorage.setItem('books', JSON.stringify(newBooks));
    } else {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
})();
