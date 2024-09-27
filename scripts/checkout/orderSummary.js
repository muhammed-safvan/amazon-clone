import { convertMoney } from "../utils/money.js";
import { cart, removeFromCart, showQuantityHtml, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getProduct } from "../../data/products.js";

export function renderOrderSummary() {
  let html = "";
  cart.forEach((product) => {
    let deliveryOptionId = product.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const matchingProduct = getProduct(product.id);

    // const today = dayjs();
    // const deliveryDate = today.add(`${deliveryOption.deliveryDays}`, "days");
    // const dateString = deliveryDate.format("dddd, MMMM D");

    const cartHTML = `
    <div class="cart-item-container 
              js-cart-item-container
              js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${calculateDeliveryDate(deliveryOption)} days
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${matchingProduct.image}>

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label
                      js-quantity-label">${
                        product.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link
                      js-update-quantity-link 
                      link-primary
                      js-update-quantity-${matchingProduct.id}"
                      data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input type = "number" 
                      value = "1" min = "1"
                      class="quantity-input 
                      js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary
                      js-save-quantity-link
                      js-save-quantity-${matchingProduct.id}"
                      data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary
                      js-delete-button
                      js-delete-button-${matchingProduct.id}" data-button-id='${
      product.id
    }'>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(product)}
                </div>
              </div>
            </div>

  `;

    html += cartHTML;
  }); //cart.forEach ends here

  document.querySelector(".js-order-summary").innerHTML = html;
  updateQuantityHtml();

  function deliveryOptionsHTML(product) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `${convertMoney(deliveryOption.priceCents)} -`;



      const isChecked = deliveryOption.id === product.deliveryOptionId;
      html += `
          <div class="delivery-option js-delivery-option"
          data-delivery-option-id = '${deliveryOption.id}'
            data-product-id = '${product.id}' >
              <input type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${product.id}">
              <div>
                <div class="delivery-option-date">
                  ${calculateDeliveryDate(deliveryOption)}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>

        `;
    });

    return html;
  }

  //updating innerText of total cart number
  let totalCart = 0;
  cart.forEach((product) => {
    totalCart += product.quantity;
  });
  //document.querySelector('.js-return-to-home-link').innerText=`${totalCart} items`;

  //function dateString (days){
  //  const today=dayjs();
  //  let deliveryDate;
  //  switch (days){
  //    case 7: deliveryDate=today.add(7 , 'days')
  //    break;
  //    case 3: deliveryDate=today.add(3 , 'days')
  //    break;
  //    case 1: deliveryDate=today.add(1 , 'days');
  //  }
  //  const stringDate=deliveryDate.format('dddd, MMMM D');
  //  return stringDate;
  //
  //}

  document.querySelectorAll(".js-delete-button").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.buttonId;
      removeFromCart(productId);
      renderPaymentSummary();
      updateQuantityHtml();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  function updateQuantityHtml() {
    let quantity = 0;
    cart.forEach((cartItem) => {
      quantity += cartItem.quantity;
    });
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${quantity} items`;
  }

  document.querySelectorAll('.js-update-quantity-link')
    .forEach(link => {
      const {productId} = link.dataset;
      link.addEventListener("click",() => {
        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        const saveElement = document.querySelector(`.js-save-quantity-${productId}`);
        const updateElement = document.querySelector(`.js-update-quantity-${productId}`);
        inputElement.classList.add('is-editing-quantity');
        saveElement.classList.add('is-editing-quantity');
        updateElement.style.display='none';
        
        inputElement.addEventListener('input', () => {
          if (inputElement.value < 1) {
            //inputElement.value = 1; // Reset to 1 if input is less than 1
            inputElement.value = Math.floor(parseFloat(inputElement.value)); // Reset to the nearest whole number 
          }
        });

        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter'){
            const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
            const saveElement = document.querySelector(`.js-save-quantity-${productId}`);
            const updateElement = document.querySelector(`.js-update-quantity-${productId}`);
            inputElement.classList.remove('is-editing-quantity');
            saveElement.classList.remove('is-editing-quantity');
            const newQuantity = +(inputElement.value);
            updateElement.style.display='initial';
            updateQuantity(productId,newQuantity);
            showQuantityHtml(productId); 
          }
        });
      });
  });
  
  document.querySelectorAll('.js-save-quantity-link')
    .forEach(link => {
      const {productId} = link.dataset;
      link.addEventListener("click",() => {
        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        const saveElement = document.querySelector(`.js-save-quantity-${productId}`);
        const updateElement = document.querySelector(`.js-update-quantity-${productId}`);
        inputElement.classList.remove('is-editing-quantity');
        saveElement.classList.remove('is-editing-quantity');
        const newQuantity = +(inputElement.value);
        updateElement.style.display='initial';
        updateQuantity(productId,newQuantity);
        showQuantityHtml(productId)       
      });
    });
}


