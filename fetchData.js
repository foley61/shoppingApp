var API = "https://anthonyfs.pythonanywhere.com/api/products/";
const shopCard = document.querySelector(".offcanvas-body");
const cartProductTotal = document.querySelector(".cartProductTotal");
const cartProductAmount = document.querySelector(".cartProductAmount");
const cartProductName = document.querySelector(".cartProductName");
const cartProductImg = document.querySelector(".cartProductImg");
const degreeBtn = document.querySelector(".degreeBtn");
const increaceBtn = document.querySelector(".increaseBtn");
const removeBtn = document.querySelector(".removeBtn");
const totalPrice = document.querySelector("#totalPrice");
const card = document.querySelector("#sepet");
//!Filter attributes dom selectors
const searchInput = document.querySelector("#searchInput");
const categoryArea = document.querySelector("#category");
//!Category buttons dom selectors
const btns = document.querySelector("#btns");
//!products dom selectors
const products = document.querySelector("#products");
const productName = document.querySelector(".productName");
const productDesc = document.querySelector(".productDesc");
const productImg = document.querySelector(".productImg");
const productPrice = document.querySelector(".productPrice");
const app = document.querySelector("body");

const addCart = app.querySelectorAll(".addCart");
const seeDetails = document.querySelector(".seeDetails");
//!Modal dom selectors
const modalName = document.querySelector(".modalName");
const modalBody = document.querySelector(".modalBody");
const modal = document.querySelector("#Modal");

document.addEventListener("DOMContentLoaded", function () {
  async function getFetch() {
    try {
      const response = await fetch(
        "https://anthonyfs.pythonanywhere.com/api/products/"
      );
      // 2.1 responstakı kategorilere göre butonları olusturmak için kategorileri uniqueCategories arrayine atıyoruz
      if (response.ok) {
        data = await response.json();
        var categories = [];
        const uniqueCategories = data.map((product) => {
          if (!categories.includes(product.category)) {
            categories.push(product.category);
          }
        });
        const colors = [
          "primary",
          "secondary",
          "success",
          "info",
          "danger",
          "light",
          "dark",
        ];
        function addCategoryBtns(x) {
          for (let i = 0; i < x.length; i++) {
            btns.innerHTML += `<button  class="btn btn-${colors[i]}">${categories[i]}</button>`;
          }
        }
        showData(data);
        addCategoryBtns(categories);
      } else {
        console.error("Failed to fetch products:", response.statusText);
    
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function showData(data, length) {
    const [...all] = data;
    const {
      id,
      title,
      description,
      category,
      category_id,
      price,
      quantity,
      image,
    } = all;
  

    var y = -1;
    function clearShow() {
      products.innerHTML = "";
    }
    clearShow();
    for (let i = 0; i < data.length; i++) {
      y = y + 1;

      let shortDesc = data[i].description.split(" ").slice(0, 13).join("  ");
      products.innerHTML += ` <div class="col">
      <div class="card h-100">
        <img
          src="${data[y].image}"
          class="p-2 productImg"
          height="250px"
          alt="..."
        />
        <div class="card-body ">
          <h5 class="card-title line-clamp-1 productName">${data[y].title}</h5>
          <p class="card-text line-clamp-3 productDesc">${shortDesc}...</p>
        </div>
        <div
          class="card-footer w-100  fw-bold d-flex justify-content-between gap-3"
        >
          <span>Price:</span><span class="productPrice">${data[y].price}$</span>
        </div>
        <div class="card-footer w-100 d-flex justify-content-center gap-3">
          <button id="${data[y].id}"  class="btn btn-danger addCart">Add Card</button>
          <button
            class="btn btn-primary seeDetails"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            id="${data[y].id}"
          >
            See Details
          </button>
        </div>
      </div>
    </div>`;
    }
  }
  filterd = "";

  btns.addEventListener(
    "click",

    (e) => {
      let value = e.target.textContent;
      let i = 0;
      if (value != "ALL") {
        i++;
        function clearHTML() {
          products.innerHTML = "";
        }

        filtered = data.filter((x) => x.category.includes(value));
        filterd = filtered;
        clearHTML();
        categoryArea.innerHTML = `${value}`;
        showData(filtered, filtered.length);
      } else {
        categoryArea.innerHTML = `${value}`;
        showData(data, data.length);
      }
    }
  );

  searchInput.addEventListener(
    "input",

    (e) => {
      let inpValue = searchInput.value;
      const propOwn = filterd;

      if ((propOwn.length >= 1) & (categoryArea.textContent != "ALL")) {
        let filteredInp = propOwn.filter((x) => x.title.includes(inpValue));

        showData(filteredInp, filteredInp.length);
      } else if ((categoryArea.textContent = "ALL")) {
        let filteredInp = data.filter((x) => x.title.includes(inpValue));

        showData(filteredInp, filteredInp.length);
      } else {
        let filteredInp = data.filter((x) => x.title.includes(inpValue));
        showData(filteredInp, filteredInp.length);
      }
    }
  );

  getFetch();
  document.addEventListener("click", (e) => {
    btnId = e.target.id;
    var filteredId = data.filter((x) => x.id == btnId);
    btn = e.target.classList;
   function increaseFunc() {
      if ( btn == "fa-solid fa-plus border bg-danger text-white rounded-circle p-2 increaseBtn") {
        productId = filteredId[0].id;
        const productContent = document.querySelector(
          `#${CSS.escape(productId)}  .cartProductAmount`
        );
        productText = productContent.textContent;
        productContent.textContent == productContent.textContent++;
        priceFunc()
        const productTotalPrice = document.querySelector(`#${CSS.escape(productId)}  .cartProductTotal`);
        totalFunc()
      }
    }
    function degreeFunc() {
      if ( btn == "fa-solid fa-minus border rounded-circle bg-danger text-white p-2 degreeBtn") {
        productId = filteredId[0].id;
        const productContent = document.querySelector(
          `#${CSS.escape(productId)}  .cartProductAmount`
        );
        productText = productContent.textContent;
        const productTotalPrice = document.querySelector(`#${CSS.escape(productId)}  .cartProductTotal`);
        if(productText != 1){
          productContent.textContent == productContent.textContent--;
          priceFunc()
          totalFunc()
        }else{
          productText = productContent.textContent;
        }
        
      }
    }

    function totalFunc(){
      const totalPrice = document.querySelector("#totalPrice");
      const productPrices = document.querySelectorAll(".cartProductTotal");
      const values = Array.from(productPrices).map((price) => Number(price.textContent));
      const allTotal = values.reduce((acc,value) => 
       acc+value,0)
      totalPrice.textContent = allTotal
      
    }
    function Counter(){
      const allAmount = document.querySelectorAll(".cartProductAmount");
      const values = Array.from(allAmount).map((value) => Number(value.textContent));
      const allTotal = values.reduce((acc,value) => 
       acc+value,0)
      sepet.textContent = allTotal
      
    }

    function priceFunc() {
      productId = filteredId[0].id;
      productsPrice = filteredId[0].price;
      const productTotalPrice = document.querySelector(`#${CSS.escape(productId)}  .cartProductTotal`);
      const amount = document.querySelector(`#${CSS.escape(productId)}  .cartProductAmount`);
      amountVal = amount.textContent
      priceVal = productTotalPrice.textContent
      sum = amountVal * productsPrice
      productTotalPrice.textContent = sum
    }
   

    if (btn == "btn btn-danger addCart") {
      addCart(filteredId[0].quantity);
      Counter()
    }
    if (btn == "btn btn-primary seeDetails") {
      addModal(filteredId[0].quantity);
    }
    if (
      btn ==
      "fa-solid fa-plus border bg-danger text-white rounded-circle p-2 increaseBtn"
    ) {
      increaseFunc();
      Counter()
    }
    if (
      btn ==
      "fa-solid fa-minus border rounded-circle bg-danger text-white p-2 degreeBtn"
    ) {
      degreeFunc();
      Counter()
    }

    function deleteFunc(){
      const removeBtns = document.querySelectorAll('.removeBtn');
         
      for (const removeBtn of removeBtns) {
        removeBtn.addEventListener('click', (event) => {
          const productId = event.target.parentElement.parentElement.parentElement.parentElement.id;
          const productElement = document.getElementById(productId);
      
          if (productElement && productElement.classList.contains('product')) {
            productElement.parentNode.removeChild(productElement);
          }
        });
      }
      
    }
    if (
      btn =
      "btn btn-danger removeBtn"
    ) {
      deleteFunc();
      totalFunc()
      Counter()
    }
 
    function addCart(quantity) {
      const existingProduct = shopCard.querySelector(`#${CSS.escape(filteredId[0].id)}`);

      if (!existingProduct) {
      shopCard.innerHTML += `
      <div class="card mb-3 product" style="max-width: 540px"  id="${filteredId[0].id}">
      <div class="row g-0">
        <div class="col-md-4 my-auto">
          <img
            src="${filteredId[0].image}"
            class="img-fluid rounded-start cartProductImg"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title cartProductName">${filteredId[0].title}</h5>
            <div class="d-flex align-items-center gap-2" role="button">
              <i
                class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2 degreeBtn"
                id="${filteredId[0].id}"
              ></i
              ><span class="fw-bold cartProductAmount" id="${filteredId[0].id}"> ${quantity}</span
              ><i
                class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2 increaseBtn"
                id="${filteredId[0].id}"
              ></i>
            </div>
            <span class="card-text ">total: </span>
            <span class="card-text cartProductTotal" id="${filteredId[0].id}">${filteredId[0].price}</span>
            <br>
            <br>
            <button class="btn btn-danger removeBtn">Remove</button>
          </div>
        </div>
      </div>
    </div>`;
    }
  } 
  function addModal() {
    const modalTitle = document.getElementById("exampleModalLabel");
    const modalBody = document.querySelector(".modalBody");

    modalTitle.textContent = filteredId[0].title

    const productDetailsHTML = `
      <div class='text-center'>
      <img src="${filteredId[0].image}" class='p-2' height='250px' alt="..." >
      <p><strong>Description:</strong> ${filteredId[0].description}</p>
        <p ><strong>Price:</strong> ${filteredId[0].price} $</p>
       
      </div>
      `;

    modalBody.innerHTML = productDetailsHTML;
  }
  });
});
