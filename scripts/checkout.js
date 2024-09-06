import { loadProducts,loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadcart,loadCartFetch } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/cart-class.js';

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadcart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/

Promise.all([
    loadProductsFetch(),
    loadCartFetch()
    
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});


/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve(address);
    });
}).then((val) => {
    return new Promise((resolve) => {
        loadcart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/




