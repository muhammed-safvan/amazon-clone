 import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";
 
//declaring cart array and
export let cart;
loadFromStorage();
export function loadFromStorage(){
    cart=JSON.parse(localStorage.getItem('cartItems'));    
    
    if(!cart){
        cart=[
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            priceCents: 1090,
            quantity:1,
            deliveryOptionId: '1'
        },{
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            priceCents: 2095,
            quantity:1,
            deliveryOptionId: '2'
        },{
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            priceCents: 799,
            quantity:1,
            deliveryOptionId:'3'
        }
        ]; 
    }
}

let totalCart=0;

export function addToCart(itemId) {

    totalCart=0;
    let productExist=false;
    cart.forEach((product)=>{
        if (itemId===product.id){
            productExist=true;
            product.quantity++;
            console.log(`product exist ${product.quantity}`);           
        }
        totalCart+=product.quantity;
    });

    // only executes if product does not exist in cart
    if(!productExist){
        products.forEach((product)=>{
            if(product.id===itemId){
                console.log('product not exist');
                cart.push({
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    priceCents: product.priceCents,
                    quantity:1,
                    deliveryOptionId:'1'
                    });
                    totalCart++;
                }
        });
    }
    
    //updateCart('totalCart');
    updateCart('cartItems');
  
    return totalCart;
    
}

function updateCart(updateType){
    switch(updateType){
        case 'cartItems' :localStorage.setItem('cartItems',JSON.stringify(cart))
        break;
        case 'totalCart':localStorage.setItem('totalCart',JSON.stringify(totalCart))
        break;   
        
    }
}

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
        if (cartItem.id !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCart('cartItems');
}

export function updateDeliveryOption(productId,deliveryOptionId){

    let matchingProduct;

    cart.forEach((cartItem)=>{
        if(cartItem.id === productId){
            matchingProduct = cartItem;
        }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;
    updateCart('cartItems');

}

export function loadCartFetch(){

    const loadCart = fetch('https://supersimplebackend.dev/cart')
    .then((details) => {
        console.log('cart loaded using loadCartFetch');
    }).catch((error) => {
        console.log('Unexpected error.please try again later' );
    });
    return loadCart;
}


export function loadCart (fun){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',() => { 
        console.log('cart loaded');    
      fun();
    });

    xhr.addEventListener('error',(error) =>{
        console.log('Unexpected error.please try again later');
    });
    
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
    
  }
