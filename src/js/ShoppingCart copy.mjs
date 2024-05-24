import { renderListWithTemplate } from "./utils.mjs";

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

export default class CartItemListing {
    constructor(list, listElement) {
        this.list = list;
        // listElement is the output target, aka the HTML element in which to render the product list.
        this.listElement = listElement;
    }
    async init() {
        this.renderList(this.list);
    }
    renderList(list) {
        this.listElement.innerhtml = "";
        renderListWithTemplate(cartItemTemplate, this.listElement, list, "afterbegin", true);
    }
}
