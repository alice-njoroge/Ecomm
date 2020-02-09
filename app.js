//send to ui
function sendItemsToCartUI(items) {
    let cartItems = '';
    items.forEach(product => {

        let cartProduct = `<div class="cart-item">
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h4>${product.title}</h4>
                    <h5>$${product.price}</h5>
                    <span class="remove-item">remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up"></i>
                    <p class="item-amount">4</p>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>`;
        cartItems +=cartProduct;
    });
    document.querySelector('.cart-content').innerHTML= cartItems;


}

//add items to cart
function addItemsToCart(button, products) {
    button.innerText = 'Added to Bag'; // change button text
    let productId = button.dataset.id; // get the id of the button that was clicked
    let product = products.find(product => { // compare if the array id and the returned id are the same
        return product.id === productId;
    });


    //add items to local storage
    let items;
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        items = JSON.parse(cartItems);
        let itemExists = items.find(item => item.id === product.id);
        if(!itemExists){
            items.push(product);// add product to the array
        }
        localStorage.setItem('cartItems', JSON.stringify(items));

    } else {
        items = [product];
        localStorage.setItem('cartItems', JSON.stringify(items));// put it in local storage
    }
    //send items to cart ui
    sendItemsToCartUI(items);
    // show cart on the screen
    openCart();

}

//add items to the UI
function addItemsToUI(products) {
    let productsHtmlString = '';
    products.map((product, index) => {
        let productString = `
        <article class="product">
            <div class="img-container">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <button class="bag-btn" data-id="${product.id}"><i class="fas fa-shopping-cart"></i>add to bag</button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>`;
        productsHtmlString += productString;
    });
    // send data to the UI
    document.querySelector('.products-center').innerHTML = productsHtmlString;

}

//open cart
function openCart() {
    document.querySelector('.cart-overlay').style.visibility = 'visible';
    document.querySelector('.cart').style.transform = 'translateY(0)';
}

//close cart
function closeCart() {
    document.querySelector('.cart').style.transform = 'translateY(100%)';
    document.querySelector('.cart-overlay').style.visibility = 'hidden';
}

document.querySelector('.close-cart').addEventListener('click', event => {
    closeCart();
});
document.querySelector('.cart-btn').addEventListener('click', event => {
    openCart();
});


// fetch data from products.json
fetch('products.json')
    .then(response => response.json())
    .then((products) => {
        addItemsToUI(products);
        // get item id on click
        let addToBagButton = document.querySelectorAll('.bag-btn');
        addToBagButton.forEach(button => {
            button.addEventListener('click', event => {
                let button = event.target; //get the actual button id on click
                addItemsToCart(button, products);

            })
        })
    });

