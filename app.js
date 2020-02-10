/**
 * calculate totals for each product
 */
function grandTotals(products) {
let grandTotal = 0;
let grandDiscountedTotal = 0;
products.forEach(product =>{
    grandTotal += product.total;
    grandDiscountedTotal += product.discountedTotal;
});
document.querySelector('.cart-total').innerText = grandTotal;
document.querySelector('.grand-cart-total').innerText = grandDiscountedTotal;


}

/**
 * calculate discounts
 * @param quantity
 * @return number
 */
function calculateDiscounts(quantity) {
    let discount;
    if (quantity >= 50) {
        discount = quantity * 0.50;
    } else if (quantity > 25 && quantity < 50) {
        discount = quantity * 0.25;
    } else if (quantity >= 10 && quantity <= 25) {
        discount = quantity * 0.10;
    } else {
        discount = 0;
    }
    return parseFloat(discount.toFixed(2));
}


/**
 * add quantity by one on clicking chevron up
 * @param itemId
 * @param direction
 */
function chevron(itemId, direction) {
    let cartItem = localStorage.getItem('cartItems');
    if (cartItem) {
        let cartItemArray = JSON.parse(cartItem);
        let productIndex = cartItemArray.findIndex(item => {
            return item.id === itemId;
        });
        if (direction === 'up') {
            cartItemArray[productIndex].quantity += 1;
        } else {
            if (cartItemArray[productIndex].quantity > 1) {
                cartItemArray[productIndex].quantity -= 1;
            }
        }
        cartItemArray[productIndex].discount = calculateDiscounts(cartItemArray[productIndex].quantity);
        let total = cartItemArray[productIndex].price * cartItemArray[productIndex].quantity;
        cartItemArray[productIndex].total = parseFloat(total.toFixed(2));
        let discountedTotal = total - cartItemArray[productIndex].discount;
        cartItemArray[productIndex].discountedTotal = parseFloat(discountedTotal.toFixed(2));
        localStorage.setItem('cartItems', JSON.stringify(cartItemArray));
        sendItemsToCartUI(cartItemArray);
        grandTotals(cartItemArray);
    }

}

/**
 * @param itemId
 * get add to cart button
 */
function getAddToCartButton(itemId) {
    let bagButtons = [...document.querySelectorAll('.bag-btn')];
    return bagButtons.find(button => button.dataset.id === itemId)
}

/**
 * clear cart and repopulate the cart ui
 */
function clearCart() {
    localStorage.removeItem('cartItems');
    sendItemsToCartUI([]);
}

/**
 * populate cart ui
 * @param items
 */
function sendItemsToCartUI(items) {
    let cartItems = '';
    items.forEach(product => {
        let discountString = '';
        let discountedTotalString = '';
        if (product.discount) {
            discountString = `<h5>Discount: $${product.discount}</h5>`;
            discountedTotalString = `<h5>Discounted Total: $${product.discountedTotal}</h5>`;
        }
        let cartProduct = `<div class="cart-item">
                <img src="${product.image}" alt="${product.title}">
                <div>
                    <h4>${product.title}</h4>
                    <h5>@: $${product.price}</h5>
                    <h5>Total: $${product.total}</h5>
                    ${discountString}
                    ${discountedTotalString}
                    <span data-id="${product.id}" class="remove-item">remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id="${product.id}"></i>
                    <p class="item-amount" data-id="${product.id}">${product.quantity}</p>
                    <i class="fas fa-chevron-down" data-id="${product.id}"></i>
                </div>
            </div><hr>`;
        cartItems += cartProduct;
    });
    document.querySelector('.cart-content').innerHTML = cartItems;
}

/**
 * add items to cart
 * @param button
 * @param products
 */
function addItemsToCart(button, products) {
    button.innerText = 'Added to Bag'; // change button text
    let productId = button.dataset.id; // get the id of the button that was clicked
    let product = products.find(product => { // compare if the array id and the returned id are the same
        return product.id === productId;
    });
    product['quantity'] = 1;
    product['discount'] = 0;
    product['total'] = product.price;
    product['discountedTotal'] = product.price;

    //add items to local storage
    let items;
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        items = JSON.parse(cartItems);
        let itemExists = items.find(item => item.id === product.id);
        if (!itemExists) {
            items.push(product);// add product to the array
        }
        localStorage.setItem('cartItems', JSON.stringify(items));
    } else {
        items = [product];
        localStorage.setItem('cartItems', JSON.stringify(items));// put it in local storage
    }
    //send items to cart ui
    sendItemsToCartUI(items);
    grandTotals(items);
    document.querySelector('.cart-items').innerText = items.length;
    // show cart on the screen
    openCart();
}

/**
 * display products on the UI
 * @param products
 */
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

/**
 * populate cart on load
 */
function populateCartOnLoad() {
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        let cartItemsArray = JSON.parse(cartItems);
        document.querySelector('.cart-items').innerText = cartItemsArray.length;
        sendItemsToCartUI(cartItemsArray);
        grandTotals(cartItemsArray);
    }
}

/**
 * removing an item from a cart
 * @param itemId
 */
function removeItemFromCart(itemId) {
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        let cartItemsArray = JSON.parse(cartItems);
        let itemIndex = cartItemsArray.findIndex(item => {
            return item.id === itemId;
        });
        cartItemsArray.splice(itemIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
        sendItemsToCartUI(cartItemsArray);
        grandTotals(cartItemsArray);
        document.querySelector('.cart-items').innerText = cartItemsArray.length;

    }
}

/**
 * open cart
 */
function openCart() {
    document.querySelector('.cart-overlay').style.visibility = 'visible';
    document.querySelector('.cart').style.transform = 'translateY(0)';
}

/**
 * close cart
 */
function closeCart() {
    document.querySelector('.cart').style.transform = 'translateY(100%)';
    document.querySelector('.cart-overlay').style.visibility = 'hidden';
}

document.querySelector('.cart-btn').addEventListener('click', event => {
    openCart();
});
document.querySelector('.cart-overlay').addEventListener('click', event => {

    if (event.target.getAttribute('class') === 'cart-overlay' || event.target.classList.contains('fa-window-close')) {
        closeCart();
    }
    if (event.target.classList.contains('clear-cart')) {
        clearCart();
    }
    if (event.target.classList.contains('remove-item')) {
        let itemId = event.target.dataset.id;
        removeItemFromCart(itemId);
        let button = getAddToCartButton(itemId);
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to bag`;
    }
    if (event.target.classList.contains('fa-chevron-up')) {
        let itemId = event.target.dataset.id;
        chevron(itemId, 'up');
    }
    if (event.target.classList.contains('fa-chevron-down')) {
        let itemId = event.target.dataset.id;
        chevron(itemId, 'down');
    }
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

populateCartOnLoad();
document.querySelector('.shop-now').addEventListener('click', event=>{
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth', block: 'center' });
});