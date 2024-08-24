import {products} from '../data/products.js';

let productId;
let matchingProduct=[];
products.forEach((product)=>{
    matchingProduct.push(product);
    productId = product.id;

    matchingProduct.forEach((checkProduct)=>{
        if(productId===checkProduct.id){
            document.querySelector('.js-product-grid')
            .innerHTML +=`
            <div class="product-container js-product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${checkProduct.image}>
                </div>
        
                <div class="product-name limit-text-to-2-lines">
                    ${checkProduct.name}
                </div>
        
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${checkProduct.rating.stars*10}.png">
                    <div class="product-rating-count link-primary">
                    ${checkProduct.rating.count}
                    </div>
                </div>
        
                <div class="product-price">
                    $${checkProduct.priceCents/100}
                </div>
        
                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>
        
                <div class="product-spacer"></div>
        
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
        
                <button class="add-to-cart-button button-primary">
                    Add to Cart
                </button>
                </div>
<!--        
                <div class="product-container js-product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="images/products/intermediate-composite-basketball.jpg">
                </div>
        
                <div class="product-name limit-text-to-2-lines">
                    Intermediate Size Basketball
                </div>
        
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-40.png">
                    <div class="product-rating-count link-primary">
                    127
                    </div>
                </div>
        
                <div class="product-price">
                    $20.95
                </div>
        
                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>
        
                <div class="product-spacer"></div>
        
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
        
                <button class="add-to-cart-button button-primary">
                    Add to Cart
                </button>
                </div>
-->        
            `;
        }
    });
    
}); 

