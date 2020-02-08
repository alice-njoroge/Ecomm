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
        // add item to cart
        let addToBagButton = document.querySelectorAll('.bag-btn');
        addToBagButton.forEach(button => {
            button.addEventListener('click',event=>{
                let button = event.target;
                button.innerText = 'Added to Bag';
                button.disabled= true;
               let productId =  button.dataset.id;
               let product = products.find(product => {
                   return product.id === productId;
               });
                console.log(product.price);
            })
        })
    });





