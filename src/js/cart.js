import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function calculateItemsTotalPrice(productArray) {
  // Calculate the total price of an array of products
  let totalPrice = 0;
  productArray.forEach(item => {
    totalPrice += item.FinalPrice;
  });
  return totalPrice.toFixed(2);
}

function removeProductFromCart(id) {
  let productsInCart = JSON.parse(localStorage.getItem("so-cart"));
  let updatedCart = productsInCart.filter((product) => !(product.Id == id));
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

function renderCartContents() {
  if (localStorage.getItem("so-cart")) {
    const cartItems = getLocalStorage("so-cart");
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const cartFooter = document.querySelector(".cart-footer");
    if (cartItems.length == 0) {
      // hide total element
      if (!cartFooter.classList.contains("hide")) {
        cartFooter.classList.add("hide");
      }
    }
    else {
      // unhide and calculate total
      cartFooter.classList.remove("hide");
      let totalPrice = calculateItemsTotalPrice(cartItems);
      const totalElem = document.querySelector(".cart-total");
      totalElem.innerHTML+=`$${totalPrice}`;
    }
    let removalButtons = document.getElementsByClassName("cart-card__remove-item");
    for (let button of removalButtons) {
      let id = button.getAttribute("data-id");
      button.addEventListener("click",removeProductFromCart.bind(this, id));
    }
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove-item" type="button" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

renderCartContents();
