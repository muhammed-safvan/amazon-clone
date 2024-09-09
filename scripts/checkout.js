import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCart,loadCartFetch } from "../data/cart.js";
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

async function loadPage() {

    try{
        //throw 'error1';
        await loadProductsFetch();
        await new Promise((resolve,reject) => {
            loadCart(() => {
                //reject('error2');
                resolve();
            });
        });
    } catch(error){
        console.log('Unexpected error.please try again later' );
    }
    

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*
Promise.all([
    loadProductsFetch(),
    loadCartFetch()
    
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

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




