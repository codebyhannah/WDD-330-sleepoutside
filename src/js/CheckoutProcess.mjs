import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputElem) {
        this.key = key;
        this.outputElem = outputElem;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(this.outputElem + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputElem + " #num-items");
        itemNumElement.innerText = `Number of Items: ${this.list.length}`;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `Subtotal: $${this.itemTotal}`;
    }
    calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them along with the cart total to figure out the order total.
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) + 
            parseFloat(this.shipping) + 
            parseFloat(this.tax)
        ).toFixed(2);
        // display the totals
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page.
        const shipping = document.querySelector(this.outputElem + " #shipping");
        const tax = document.querySelector(this.outputElem + " #tax");
        const orderTotal = document.querySelector(this.outputElem + " #orderTotal");
        shipping.innerText = `Shipping Estimate: $${this.shipping}`;
        tax.innerText = `Tax: $${this.tax}`;
        orderTotal.innerText = `Order Total: $${this.orderTotal}`;
    }
    async checkout() {
        const formElem = document.forms["checkout"];

        const json = FormDataToJSON(formElem);
        // add totals and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const response = await services.checkout(json);
        } catch (err) {
            console.log(err);
        }
    }
}