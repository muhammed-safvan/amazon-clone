
import { products } from "./products.js";
 
//declaring cart array and

function Cart (localStorageKey) {

    const cart = {
        cartItems : undefined,
    
        loadFromStorage : function(){
    
            this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));    
            
            if(!this.cartItems){
                this.cartItems=[
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
        },
    
        addToCart : function (itemId) {
    
            let totalCart=0;
            let productExist=false;
            this.cartItems.forEach((product)=>{
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
                        this.cartItems.push({
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
            this.updateCart(localStorageKey);
            
        },
    
        updateCart : function(updateType){
            switch(updateType){
                case localStorageKey :localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems))
                break;
                case 'totalCart':localStorage.setItem('totalCart',JSON.stringify(this.totalCart))
                break;   
                
            }
        },
        
        removeFromCart : function(productId){
            const newCart = [];
            this.cartItems.forEach((cartItem)=>{
                if (cartItem.id !== productId){
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
        
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            updateCart('cart-oop');
        },
         
        updateDeliveryOption : function (productId,deliveryOptionId){
    
            let matchingProduct;
    
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.id === productId){
                    matchingProduct = cartItem;
                }
            });
    
            matchingProduct.deliveryOptionId = deliveryOptionId;
            updateCart('cart-oop');
    
        }
    
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');

cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);



    