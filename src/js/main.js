import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
let listElem = document.querySelector("ul.product-list");
const productList = new ProductListing("tents", dataSource, listElem);
productList.init();