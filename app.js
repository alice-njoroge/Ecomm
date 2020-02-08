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
        // get item id on click
        let addToBagButton = document.querySelectorAll('.bag-btn');
        addToBagButton.forEach(button => {
            button.addEventListener('click', event => {
                let button = event.target; //get the actual button id on click
                button.innerText = 'Added to Bag'; // change button text
                button.disabled = true; // disable button once item is clicked once
                let productId = button.dataset.id; // get the id of the button that was clicked
                let product = products.find(product => { // compare if the array id and the returned id are the same
                    return product.id === productId;
                });
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





