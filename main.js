//create container
let cards =document.createElement("div");
cards.className = "container mt-5 main";
let div = document.createElement("div");
div.className = "container mt-5 main" ;
let header =document.createElement("h3")
header.className = "header"
header.innerHTML="Please fill out the form to list your product on our site "
//form start
let form = document.createElement("form");
form.className = "form-control"; //bootstrap class
//input to inset the book name
let bname = document.createElement("input");
bname.type = "text";
bname.placeholder = "Book Name";
bname.required = true;
bname.className = "input";
//input to insert book price
let price = document.createElement("input");
price.type = "number";
price.placeholder = "Book Price";
price.required = true;
price.min =0;
price.className = "input";
//input to insert book description
let description = document.createElement("input");
description.type = "text";
description.placeholder = "Book Description";
description.required = true;
description.className = "input";

//input to named the author
let author = document.createElement("input");
author.type = "text";
author.placeholder = "Book Author";
author.required = true;
author.className = "input";

//input to named the publisher
let publisher = document.createElement("input");
publisher.type = "text";
publisher.placeholder = "Book Publisher";
publisher.className = "input";

//input to insert book condition
let condition = document.createElement("input");
condition.type = "text";
condition.placeholder = "Book Status (New/Used)";
condition.required = true;
condition.className = "input";
//input to insert book category
let category = document.createElement("input");
category.type = "text";
category.placeholder = "Book category";
category.required = true;
category.className = "input";


//input to insert book img
let image = document.createElement("input");
image.type = "file";
image.placeholder = "Book Photo";
image.required = true;
image.className = "input";


//button to submit form
let submit = document.createElement("button");
submit.className = "btn btn-success btn1";
submit.type = "SUBMIT";
submit.textContent = "Send";
//input to reset form
let reset = document.createElement("button");
reset.className = "btn btn-danger btn2 ";
reset.type = "reset";
reset.textContent = "reset";
//form end
//to view conent in the page
// document.body.appendChild(header);
document.querySelector('.main-wrapper').prepend(header);
form.appendChild(bname);
form.appendChild(price);
form.appendChild(description);
form.appendChild(category);
form.appendChild(author);
form.appendChild(publisher);
form.appendChild(condition);
form.appendChild(image);
form.appendChild(submit);
form.appendChild(reset);
// div.appendChild(form);
document.querySelector("#form-container").appendChild(form);

document.body.appendChild(div);
document.body.appendChild(cards)


// back data from localstorage
let booksarr
if(localStorage.userBooks !=null){
    booksarr=JSON.parse(localStorage.userBooks)
}
else{
booksarr =[]
}
let regexp = /(.png|.jpg|.jpeg|.svg)$/i;
form.addEventListener("submit", function () {
    event.preventDefault();
    //check book status
  if (
    condition.value.toLowerCase().trim() != "new" &&
    condition.value.toLowerCase().trim() != "used"
  ) {
        Swal.fire({
  title:"Please enter a valid conditio (new,used)",
  icon: "warning",
  draggable: true
});
    condition.focus();
    return;
  }
  //check image extention
  if (!regexp.test(image.value)) 
    {
    
    Swal.fire({
  title: "form please enter valid photo!",
  icon: "warning",
  draggable: true
});
    image.focus();
    return;
  }
  let file = image.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    let base64Image = reader.result;
  //add data into localstorage
    let obj = {
    bname: bname.value,
    price: price.value,
    description: description.value,
    author: author.value,
    publisher: publisher.value,
    condition: condition.value,
    category: category.value,
    image: base64Image ,
  };

  booksarr.push(obj); //add obj into array
  localStorage.setItem("userBooks", JSON.stringify(booksarr));
Swal.fire({
  position: "center",
  icon: "success",
  title: "Your form has been saved",
  showConfirmButton: false,
  timer: 1500
});
  // reset form
  form.reset();
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    Swal.fire({
        title: "No image selected!",
      icon: "error"
    });
  }
  setTimeout(() => {
    window.location.href="payment.html"
  }, 2000);
});
