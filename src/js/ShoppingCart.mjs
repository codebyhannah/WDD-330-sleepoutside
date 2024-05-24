import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
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
}

export default class ShoppingCart {
    constructor(listSource, listElement) {
        this.listSource = listSource;
        // listElement is the output target, aka the HTML element in which to render the product list.
        this.listElement = document.querySelector(listElement);
    }
    async init() {
        this.renderList(this.list);
    }
    renderList(list) {
        this.listElement.innerhtml = "";
        renderListWithTemplate(cartItemTemplate, this.listElement, list, "afterbegin", true);
    }

    calculateItemsTotalPrice(productArray) {
        // Calculate the total price of an array of products
        let totalPrice = 0;
        productArray.forEach(item => {
          totalPrice += item.FinalPrice;
        });
        return totalPrice.toFixed(2);
    }
      
    removeProductFromCart(id) {
        let productsInCart = JSON.parse(localStorage.getItem(this.listSource));
        let updatedCart = productsInCart.filter((product) => !(product.Id == id));
        setLocalStorage(this.listSource, updatedCart);
        this.renderCartContents();
    }
      
    renderCartContents() {
        if (localStorage.getItem(this.listSource)) {
          const cartItems = getLocalStorage(this.listSource);
      
          this.renderList(cartItems);
      
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
            let totalPrice = this.calculateItemsTotalPrice(cartItems);
            const totalElem = document.querySelector(".cart-total");
            totalElem.innerHTML=`Total: $${totalPrice}`;
          }
          let removalButtons = document.getElementsByClassName("cart-card__remove-item");
          for (let button of removalButtons) {
            let id = button.getAttribute("data-id");
            button.addEventListener("click",this.removeProductFromCart.bind(this, id));
          }
        }
    }
}
