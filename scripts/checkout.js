import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { convertMoney } from "./utils/money.js";
import { addToCart } from '../data/cart.js';


let cart=[];
updateCartHtml();

function updateCartHtml(){
  const storedCart = localStorage.getItem('cartItems');
  cart = storedCart ?  JSON.parse(storedCart):[];
  generateCartHtml();

}

//this function generates html of the cart 
function generateCartHtml(){
let html='';
cart.forEach((product)=>{
   const cartHTML=
 
`
  <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString(7)}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString(3)}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString(1)}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

`;
html+=cartHTML;

});

document.querySelector('.js-order-summary')
  .innerHTML=html;

  const buttons = document.querySelectorAll('.js-delete-button');
  buttons.forEach((button)=>{
  button.addEventListener("click" , removeFromCart); 
});

//updating innerText of total cart number
let totalCart = 0;
cart.forEach((product)=>{
  totalCart += product.quantity;
});
document.querySelector('.js-return-to-home-link').innerText=totalCart;

}//end of generateCartHtml

function dateString (days){
  const today=dayjs();
  let deliveryDate;
  switch (days){
    case 7: deliveryDate=today.add(7 , 'days')
    break;
    case 3: deliveryDate=today.add(3 , 'days')
    break;
    case 1: deliveryDate=today.add(1 , 'days');
  }
  const stringDate=deliveryDate.format('dddd, MMMM D');
  return stringDate;

}

//let buttonId ='';

function removeFromCart(event){
  const button = event.currentTarget;
  let buttonId = button.dataset.buttonId;
let newCart=[];
cart.forEach((product)=>{

  if(product.id !== buttonId){
    newCart.push(product);
  }

});

cart=newCart;
console.log(cart);
localStorage.setItem('cartItems', JSON.stringify(cart));
updateCartHtml();

}

