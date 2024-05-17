import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        // listElement is the output target, aka the HTML element in which to render the product list.
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
/* 
Remove extra products
    tents.json has more tents than we currently need.
    Write a method in productList.js that will filter our list of products to just the four (4) we need.
    Use that method to show only those four (4) tents.

filter list how? IDs?

array.filter works like this

array.filter(callback);
function callback(item) {
    return bool-about-item;
}

so I could do something like == ID || == difID
*/