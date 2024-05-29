import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();
let listElem = document.querySelector("ul.product-list");
const productList = new ProductList(category, dataSource, listElem);
productList.init();

let titleSpan = document.querySelector(".title");
// Gets first character and makes it upper case, then gets second character and on as is. Would not title case multi word strings, but works fine for this.
let categoryTitleCase = category[0].toUpperCase() + category.slice(1);
titleSpan.innerHTML = categoryTitleCase;
