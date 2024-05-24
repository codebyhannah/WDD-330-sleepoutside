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
}