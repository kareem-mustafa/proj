

//get from localstorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const grandTotalAmount = document.getElementById("grandTotalAmount");

function renderCart() {
  // to dont repeat remove meassages
  document.querySelectorAll("h2, .empty-message, .clear-all-btn").forEach(el => el.remove());
  document.body.querySelector("#cartContainer")?.remove(); // delete old cart

  if (cartItems.length === 0) {
    if (!document.querySelector(".empty-message")) {
      const emptyMessage = document.createElement("h3");
      emptyMessage.textContent = "Your cart is empty.";
      emptyMessage.classList.add("empty-message");
      document.body.appendChild(emptyMessage);
    }
    grandTotalAmount.textContent = "$0.00";
    return;
  }

  // header

  const cartContainer = document.createElement("div");
  cartContainer.id = "cartContainer";

  let grandTotal = 0;

  cartItems.forEach((book, index) => {
    let quantity = book.quantity || 1;

    const container = document.createElement("div");
    const cartdetails = document.createElement("div");
    const cartitem = document.createElement('div');
    cartitem.classList.add("cart-item");

    // image
    const itemimg = document.createElement('img');
    itemimg.src = book.image;
    itemimg.style.width = "120px";

    // description
    const itemdetails = document.createElement('div');

    const booktitle = document.createElement("h4");
    booktitle.textContent = book.title;

    const bookdescription = document.createElement("p");
    bookdescription.textContent = book.description || "No description available.";

    // quantity
    const quantitylabel = document.createElement('h4');
    quantitylabel.textContent = "Quantity";

    const itemquantity = document.createElement('div');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';

    const quantityspan = document.createElement('span');
    quantityspan.textContent = quantity;
    quantityspan.style.margin = "0 10px";

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';

    // price
    const itemprice = document.createElement('div');
    const pricelable = document.createElement('h4');
    pricelable.textContent = "Price: $" + book.price;

    // total price
    const totalprice = document.createElement('div');
    const totallabel = document.createElement('span');
    totallabel.textContent = "Total: ";

    const totalamount = document.createElement('span');
    totalamount.textContent = (quantity * book.price).toFixed(2);

    // remove from cart button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Remove from Cart";
    deleteBtn.style.marginTop = "10px";
    deleteBtn.onclick = function () {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    };

    function updateTotal() {
      if (quantity === 0) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
        return;
      }

      totalamount.textContent = (quantity * book.price).toFixed(2);
      cartItems[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      updateGrandTotal();
    }

    minusBtn.onclick = function () {
      if (quantity > 0) {
        quantity--;
        quantityspan.textContent = quantity;
        updateTotal();
      }
    };

    plusBtn.onclick = function () {
      quantity++;
      quantityspan.textContent = quantity;
      updateTotal();
    };

    itemquantity.appendChild(quantitylabel);
    itemquantity.appendChild(minusBtn);
    itemquantity.appendChild(quantityspan);
    itemquantity.appendChild(plusBtn);

    totalprice.appendChild(totallabel);
    totalprice.appendChild(totalamount);

    itemprice.appendChild(pricelable);

    itemdetails.appendChild(booktitle);
    itemdetails.appendChild(bookdescription);
    itemdetails.appendChild(itemquantity);
    itemdetails.appendChild(itemprice);
    itemdetails.appendChild(totalprice);
    itemdetails.appendChild(deleteBtn);

    cartitem.appendChild(itemimg);
    cartitem.appendChild(itemdetails);

    cartdetails.appendChild(cartitem);
    container.appendChild(cartdetails);

    cartContainer.appendChild(container);

    grandTotal += quantity * book.price;
  });

  document.body.appendChild(cartContainer);
  updateGrandTotal();

  // clear all button
  const clearAllBtn = document.createElement('button');
  clearAllBtn.textContent = "Clear All";
  clearAllBtn.classList.add("clear-all-btn");
  clearAllBtn.style.marginTop = "20px";
  clearAllBtn.style.backgroundColor = "red";
  clearAllBtn.style.color = "white";
  clearAllBtn.onclick = function () {
    cartItems = [];
    localStorage.removeItem("cart");
    renderCart();
  };
  document.body.appendChild(clearAllBtn);
}

function updateGrandTotal() {
  let total = 0;
  cartItems.forEach(book => {
    let quantity = book.quantity || 1;
    total += quantity * book.price;
  });
  grandTotalAmount.textContent = `$${total.toFixed(2)}`;
}

renderCart();
