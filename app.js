let products = [];

fetch('products.json')
    .then(response => response.json())
    .then((data) => {
        products = data;
        /*for loop
        for(let i=0;i<products.length; i++){
            let item = products[i];
        } */
        /* foreach
       products.forEach((product,index)=> {
            console.log(product.title)
        }) */

        /* for of
        for(let product of products){
            console.log(product.price)
        }
         */
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
        </article>`
            productsHtmlString += productString;
        });
        document.querySelector('.products-center').innerHTML = productsHtmlString;


    });



