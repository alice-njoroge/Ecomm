function openCart() {
    document.querySelector('.cart-overlay').style.visibility='visible';

}

// fetch data from products.json
fetch('products.json')
    .then(response => response.json())
    .then((products) => {

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
        document.querySelector('.products-center').innerHTML = productsHtmlString;

        // get item id on click
        let addToBagButton = document.querySelectorAll('.bag-btn');
        let newItems = '';
        addToBagButton.forEach(button => {
            button.addEventListener('click', event => {
                let button = event.target; //get the actual button id on click
                button.innerText = 'Added to Bag'; // change button text
                button.disabled = true; // disable button once item is clicked once
                let productId = button.dataset.id; // get the id of the button that was clicked
                let product = products.find(product => { // compare if the array id and the returned id are the same
                    return product.id === productId;
                });
                //add item to cart

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
                newItems += cartProduct;
                // show cart on the screen
                openCart();

                //add items to local storage
                let cartItems = localStorage.getItem('cartItems');
                if (cartItems) {
                    let items = JSON.parse(cartItems);
                    items.push(product);// add product to the array
                    localStorage.setItem('cartItems', JSON.stringify(items));

                } else {
                    let cartItem = JSON.stringify([product]); // convert an array into json string
                    localStorage.setItem('cartItems', cartItem);// put it in local storage

                }
            })
        })
    });

