import { getProduct } from "../../data/products.js";
import { loadProductsFetch } from "../../data/products.js";

let orders = JSON.parse(localStorage.getItem('orders')) || [];


export async function loadOrders(){
    await loadProductsFetch();
    renderOrder();

}

function renderOrder(){
    let html = '';
    orders.forEach((item) => {
        const matchingProduct = getProduct(item.id);
        html += `

        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: August 15
            </div>
            <div class="product-quantity">
            Quantity: ${item.quantity}
            </div>
            <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
        </div>

        <div class="product-actions">
            <a href="tracking.html">
            <button class="track-package-button button-secondary">
                Track package
            </button>
            </a>
        </div>
    
        `;
    });
    document.querySelector('.js-order-details')
    .innerHTML = html;
}

export function getOrder(cartItems){
    orders = [];
    cartItems.forEach((cartItem) => {
        orders.unshift(cartItem)
    });
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
