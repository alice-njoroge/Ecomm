//immutable variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//cart
let cart = [];

//get products
class Products {
    async getProducts(){
        try {
            let result= await fetch('products.json');
            let data = await  result.json();
            console.log(data)
            return data;
        }
        catch (error) {
            console.log(error);

        }

    }

}

//display products
class UI{

}

class Storage{

}

document.addEventListener("DomContentLoaded",()=>{
    const ui= new UI;
    const products = new Products();
    products.getProducts();
});


