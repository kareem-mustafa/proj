window.onload = function () {
  //show cards
  let cards = document.createElement("div");
  cards.className = "container";
  let header = document.createElement("h3");
  header.className = "header";
  header.innerHTML =
    "This feature is not free. Please pay to be able to display your product on our website.";
  document.body.appendChild(header);
  document.body.appendChild(cards);
  //get item from localstorage
  let books = JSON.parse(localStorage.getItem("books"));
  //show last item
  let book = books[books.length - 1];
  if (book) {
    let card = document.createElement("div");
    card.innerHTML = `
 <div class="card mb-3" style="max-width: 75%;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src=${book.image} class="card-img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
       <h5 class="card-title"><strong>Book Name:</strong>${book.bname}</h5>
  <p class="card-text"><strong>Book Price:</strong>${book.price}$</p>
<button class="button"><strong>You need to pay :</strong>${(
      book.price * 0.1
    ).toFixed(1)}$</button>
      </div>
    </div>
  </div>
</div>
  `;
    cards.appendChild(card);
  }
  //show method payment
  let div = document.createElement("div");
  div.innerHTML = `
    <div class="f-pay">
      <div class="header"><h6>Select the payment method:</h6></div>

      <div class="pay">
        <input type="radio" name="pay" id="vodafonecash" value="vodafonecash" onclick="showinput()">
        <img src="./download.png" alt="vodafonecash">
        <label for="vodafonecash">Vodafone Cash</label>
      </div>

      <div class="pay pay-insta">
        <input type="radio" name="pay" id="instapay" value="instapay" onclick="showinput()">
        <img src="./images.png" alt="instapay">
        <label for="instapay" >InstaPay</label>
      </div>
      <div id="num"></div>
      </div>
  `;
  document.body.appendChild(div);
};
//check number
//show input
let mobilenumregexp = /^(01)(0|1|2|5)[0-9]{8}$/;
function showinput() {
  let div = document.getElementById("num");
  div.innerHTML = "";
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your number";
  input.required = true;
  input.className = "input-num";
  let button = document.createElement("button");
  button.type = "button";
  button.textContent = "send";
  div.appendChild(input);
  div.appendChild(button);
  button.addEventListener("click", () => {
    event.preventDefault()
        const number = input.value.trim();
    if (!mobilenumregexp.test(number)) {
      Swal.fire({
        title: "Please enter a valid number",
        icon: "warning",
        draggable: true,
      });
      input.focus()
    }else{
        Swal.fire({
        title: "your book was added",
        icon: "success",
        draggable: true,
      });
      div.innerHTML=""
    }
  });
}
