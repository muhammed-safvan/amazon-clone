import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { convertMoney } from "./utils/money.js";
import { cart ,removeFromCart,updateDeliveryOption } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';


function renderOrderSummary(){
let html='';
cart.forEach((product)=>{

  let deliveryOptionId = product.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{

    if(deliveryOptionId === option.id){
      deliveryOption = option;
    }

  });

  const today = dayjs();
  const deliveryDate = today.add(
    `${deliveryOption.deliveryDays}`, 'days' 
  );
  const dateString = deliveryDate.format('dddd, MMMM D');

  const cartHTML=
 
`
  <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${product.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${convertMoney(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${product.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-button" data-button-id='${product.id}'>
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

html+=cartHTML;

});

document.querySelector('.js-order-summary')
  .innerHTML=html;


function deliveryOptionsHTML(product){

  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{

    const priceString = deliveryOption.priceCents === 0
    ? 'FREE '
    : `${convertMoney(deliveryOption.priceCents)} -`; 

    const today = dayjs();
    const deliveryDate = today.add(
      `${deliveryOption.deliveryDays}`, 'days' 
    );

    const dateString = deliveryDate.format('dddd, MMMM D');

    const isChecked = deliveryOption.id === product.deliveryOptionId;
    html += 
    `
        <div class="delivery-option js-delivery-option"
        data-delivery-option-id = '${deliveryOption.id}'
          data-product-id = '${product.id}' >
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>

      `

    });

    return html;

  }


  //updating innerText of total cart number
  let totalCart = 0;
  cart.forEach((product)=>{
    totalCart += product.quantity;
  });
  document.querySelector('.js-return-to-home-link').innerText=`${totalCart} items`;


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

  document.querySelectorAll('.js-delete-button')
  .forEach((link)=>{
    link.addEventListener("click" ,()=>{
      let productId = link.dataset.buttonId;
      removeFromCart(productId);
  }); 
  });

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener("click",()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();