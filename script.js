console.log("✔ JavaScript file loaded");

// lltoggele
const hamburger = document.querySelector(".hamburger");
const menuList = document.querySelector(".menu-list");

hamburger.addEventListener("click", () => {
  menuList.classList.toggle("show");
});


function checkLoginAndRedirect() {
  if (!localStorage.getItem("username")) {
    window.location.href = "login.html";
  }
}


document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkLoginAndRedirect();
    // لو مسجل، كمل عملية الشراء...
  });
});

// مثال: حماية زر البيع أو رفع كتاب
const sellBtn = document.getElementById("sell-book");
if (sellBtn) {
  sellBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkLoginAndRedirect();
    // لو مسجل، روّحي لصفحة إضافة الكتاب...
  });
}

   document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const userInfo = document.getElementById("user-info");
  const authBtn = document.getElementById("auth-btn");

  function renderUI() {
    const username = localStorage.getItem("username");
    if (username) {
      userInfo.textContent = `Hello, ${username}`;
      authBtn.textContent = "Logout";
      authBtn.onclick = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("rememberMe");
        renderUI(); // إعادة عرض الزر بعد تسجيل الخروج
      };
    } else {
      userInfo.textContent = "";
      authBtn.textContent = "Login";
      authBtn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  }

  renderUI(); // تشغيل عند أول تحميل
});


// slider
let currentSlide = 0;

function changeSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  const offset = -currentSlide * 100;
  document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
}

setInterval(function () {
  changeSlide(1);
}, 3000);

//  Books discount
 fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const offerBooks = data.filter(book => book.price < 100).slice(0, 3);
    const grid = document.querySelector('.product-grid');

    
    grid.innerHTML = "";

    offerBooks.forEach(book => {
      const item = document.createElement('div');
      item.classList.add('product-item');
      item.setAttribute('data-id', book.id);

      const savedRating = localStorage.getItem(`rating-${book.id}`) || 0;

      item.innerHTML = `
        <figure class="product-style">
          <img src="${book.image}" alt="${book.title}" class="product-image" data-id="${book.id}">
          <button type="button" class="add-to-cart" data-id="${book.id}">Add to Cart</button>
        </figure>
        <figcaption>
          <h3>${book.title}</h3>
          <span>${book.author}</span>
          <div class="item-price">
            <span class="prev-price">$ ${(book.price + 20).toFixed(2)}</span>
            $ ${book.price.toFixed(2)}
          </div>
          <div class="rating" data-id="${book.id}">
            ${createStars(savedRating)}
          </div>
        </figcaption>
      `;

      grid.appendChild(item);
    });

    
    document.querySelectorAll('.rating').forEach(ratingContainer => {
      ratingContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
          const bookId = ratingContainer.dataset.id;
          const rating = e.target.dataset.rating;
          localStorage.setItem(`rating-${bookId}`, rating);
          ratingContainer.innerHTML = createStars(rating);
        }
      });
    });

   document.querySelectorAll('.product-image').forEach(img => {
  img.addEventListener('click', () => {
    const id = img.dataset.id;
    localStorage.setItem('selectedBookId', id);  // اختياري الآن
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

  })
  .catch(error => console.error('Error loading books:', error));


function createStars(currentRating) {
  let starsHTML = '';
  currentRating = parseInt(currentRating) || 0;
  for (let i = 1; i <= 5; i++) {
    starsHTML += `<span class="star ${i <= currentRating ? 'filled' : ''}" data-rating="${i}">&#9733;</span>`;
  }
  return starsHTML;
}


const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (this.value.trim()) {
                    alert('Searching for: ' + this.value);
                    this.value = '';
                    searchBar.classList.remove('active');
                }
            }
        });