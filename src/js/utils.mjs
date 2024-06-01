// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a parameter from the url
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(param);
  return paramValue;
}

export function renderListWithTemplate(templateFn, parentElem, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElem.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElem.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElem, data, callback) {
  parentElem.insertAdjacentHTML( "afterbegin", template.innerHTML);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(response => response.text());
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  let headerTemplate = await loadTemplate("/partials/header.html");
  let footerTemplate = await loadTemplate("/partials/footer.html");
  let header = document.querySelector("header");
  let footer = document.querySelector("footer");
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  updateCartCount();
}

export function updateCartCount() {
  let cartNumElem = document.querySelector("#cart-item-num");
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length == 0) {
    cartNumElem.classList.add("hide");
  }
 else {
  cartNumElem.classList.remove("hide");
  cartNumElem.innerText = cartItems.length;
 }
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><button>X</button>`;
  alert.addEventListener("click", e => {
    if(e.target.tagName == "BUTTON") {
      // target tagname must be uppercase for some reason
      main.removeChild(alert);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0,0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(alert => document.querySelector("main").removeChild(alert));
}