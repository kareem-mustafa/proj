
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'));
  const username = localStorage.getItem("username");

  let allBooks = [];

 
  try {
    const res = await fetch('books.json');
    const jsonBooks = await res.json();
    const formattedJsonBooks = jsonBooks.map(book => ({
      ...book,
      condition: 'new',
      rating: book.rating || 0
    }));
    allBooks = [...allBooks, ...formattedJsonBooks];
  } catch (err) {
    console.warn("Couldn't load books.json:", err);
  }

  const userBooks = JSON.parse(localStorage.getItem('userBooks')) || [];
  const formattedUserBooks = userBooks.map(book => ({
    ...book,
    condition: 'used',
    rating: book.rating || 0
  }));
  allBooks = [...allBooks, ...formattedUserBooks];

 
  const book = allBooks.find(b => b.id == bookId);
  const container = document.getElementById('book-details');

  if (book) {
    container.innerHTML = `
      <div class="book-details-card">
        <div class="book-detail-left">
          <img src="${book.image}" alt="${book.title}" class="book-image">
        </div>
        <div class="book-detail-right">
          <h2 class="book-title">${book.title}</h2>
          <p><strong>Author:</strong> ${book.author || 'Unknown'}</p>
          <p><strong>Price:</strong> ${book.price} $</p>
          <p><strong>Status:</strong> ${book.condition}</p>
          <p><strong>Description:</strong> ${book.description}</p>
          <p><strong>Category:</strong> ${book.category || 'N/A'}</p>
          <p><strong>Publisher:</strong> ${book.publisher || 'N/A'}</p>
          <button class="buy-button" id="buyBtn">Buy Now</button>
        </div>
      </div>
    `;

   
    const buyBtn = document.getElementById("buyBtn");
    buyBtn.addEventListener("click", () => {
      if (!username) {
        Swal.fire({
          title: "Login Required",
          text: "You must log in to buy this book.",
          icon: "warning",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#74642F"
        }).then(result => {
          if (result.isConfirmed) {
            window.location.href = "login.html";
          }
        });
        return;
      }

      
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id == book.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        book.quantity = 1;
        cart.push(book);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });
  } else {
    container.textContent = "Book not found.";
  }
});


