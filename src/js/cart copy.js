import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import CartItemListing from "./ShoppingCart.mjs";

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

    let listElem = document.querySelector(".product-list");
    let cartItemList = new CartItemListing(cartItems,listElem);
    cartItemList.init();

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
      totalElem.innerHTML=`Total: $${totalPrice}`;
    }
    let removalButtons = document.getElementsByClassName("cart-card__remove-item");
    for (let button of removalButtons) {
      let id = button.getAttribute("data-id");
      button.addEventListener("click",removeProductFromCart.bind(this, id));
    }
  }
}

renderCartContents();
loadHeaderFooter();