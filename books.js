
function createStars(currentRating, bookId, editable = false) {
  currentRating = parseInt(currentRating) || 0;
  let starsHTML = '';

  for (let i = 1; i <= 5; i++) {
    starsHTML += `
      <span class="star ${i <= currentRating ? 'filled' : ''}" 
        data-rating="${i}" 
        data-id="${bookId}" 
        ${editable ? 'data-editable="true"' : ''}>
        &#9733;
      </span>`;
  }

  return starsHTML;
}


function displayBooks(books) {
  const container = document.getElementById('books-container');
  container.className = 'product-grid';
  container.innerHTML = '';

  if (!books || books.length === 0) {
    container.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach(book => {
    const stars = createStars(book.rating || 0, book.id, true);

    const bookCard = `
      <div class="product-item">
        <div class="product-style">
          <img class="product-image" src="${book.image}" alt="${book.title}" data-id="${book.id}">
        </div>
        <h3>${book.title}</h3>
        <p>Price: ${book.price} $</p>
        <span class="condition ${book.condition}">
          ${book.condition === 'new' ? 'New' : 'Used'}
        </span>
        <div class="rating">${stars}</div>
        <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
      </div>
    `;

    container.innerHTML += bookCard;
  });

  attachBookEvents(books);
  attachRatingEvents(books);
}

async function loadJsonBooks() {
  try {
    const res = await fetch('books.json');
    const books = await res.json();

    return books.map(book => ({
      ...book,
      condition: 'new',
      rating: book.rating || 0
    }));
  } catch (err) {
    console.error("Error loading books.json:", err);
    return [];
  }
}


function loadUserBooks() {
  const books = JSON.parse(localStorage.getItem('userBooks')) || [];
  return books.map(book => ({
    ...book,
    condition: 'used',
    rating: book.rating || 0
  }));
}


async function getAllBooks() {
  const jsonBooks = await loadJsonBooks();
  const userBooks = loadUserBooks();
  return [...jsonBooks, ...userBooks];
}


function populateFilterOptions(books) {
  const categorySet = new Set();
  const authorSet = new Set();
  const publisherSet = new Set();

  books.forEach(book => {
    if (book.category) categorySet.add(book.category);
    if (book.author) authorSet.add(book.author);
    if (book.publisher) publisherSet.add(book.publisher);
  });

  populateSelect('category-filter', categorySet);
  populateSelect('author-filter', authorSet);
  populateSelect('publisher-filter', publisherSet);
}

function populateSelect(selectId, itemsSet) {
  const select = document.getElementById(selectId);
  const label = selectId.split('-')[0];
  select.innerHTML = `<option value="">All ${label.charAt(0).toUpperCase() + label.slice(1)}s</option>`;

  Array.from(itemsSet).sort().forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}


function filterBooks() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const priceFilter = document.getElementById('price-filter').value;
  const conditionFilter = document.getElementById('condition-filter').value;
  const categoryFilter = document.getElementById('category-filter').value;
  const authorFilter = document.getElementById('author-filter').value;
  const publisherFilter = document.getElementById('publisher-filter').value;

  getAllBooks().then(allBooks => {
    const filtered = allBooks.filter(book => {
      return (
        book.title.toLowerCase().includes(searchTerm) &&
        (priceFilter === '' || book.price <= parseInt(priceFilter)) &&
        (conditionFilter === '' || book.condition === conditionFilter) &&
        (categoryFilter === '' || book.category === categoryFilter) &&
        (authorFilter === '' || book.author === authorFilter) &&
        (publisherFilter === '' || book.publisher === publisherFilter)
      );
    });

    displayBooks(filtered);
  });
}


function attachBookEvents(data) {
  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', () => {
      const id = img.dataset.id;
      localStorage.setItem('selectedBookId', id);
      window.location.href = `book-details.html?id=${id}`;
    });
  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const selectedBook = data.find(book => book.id == id);

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id == selectedBook.id);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        selectedBook.quantity = 1;
        cart.push(selectedBook);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = 'cart.html';
    });
  });
}


function attachRatingEvents(allBooks) {
  document.querySelectorAll('.star[data-editable="true"]').forEach(star => {
    star.addEventListener('click', () => {
      const bookId = parseInt(star.dataset.id);
      const newRating = parseInt(star.dataset.rating);

      const bookIndex = allBooks.findIndex(b => b.id === bookId);
      if (bookIndex === -1) return;

      allBooks[bookIndex].rating = newRating;

      let userBooks = JSON.parse(localStorage.getItem('userBooks')) || [];
      const userIndex = userBooks.findIndex(b => b.id === bookId);
      if (userIndex !== -1) {
        userBooks[userIndex].rating = newRating;
        localStorage.setItem('userBooks', JSON.stringify(userBooks));
      }

      displayBooks(allBooks);
    });
  });
}


document.addEventListener('DOMContentLoaded', async () => {
  const allBooks = await getAllBooks();
  displayBooks(allBooks);
  populateFilterOptions(allBooks);

  document.getElementById('search').addEventListener('input', filterBooks);
  document.getElementById('price-filter').addEventListener('change', filterBooks);
  document.getElementById('condition-filter').addEventListener('change', filterBooks);
  document.getElementById('category-filter').addEventListener('change', filterBooks);
  document.getElementById('author-filter').addEventListener('change', filterBooks);
  document.getElementById('publisher-filter').addEventListener('change', filterBooks);
});


