import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // To avoid overwriting in localStorage, either use a different key for each item, or place items in an array. Get array from local storage, push to array, and set local storage to updated array.
  let productsInCart = JSON.parse(localStorage.getItem("so-cart"));
  if (!localStorage.getItem("so-cart")) {
    productsInCart = [];
  }
  productsInCart.push(product);
  setLocalStorage("so-cart", productsInCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
