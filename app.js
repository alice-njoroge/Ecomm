let products = [];

 fetch('products.json')
    .then(response => response.json())
    .then((data)=>{
        products = data;
        /*for loop
        for(let i=0;i<products.length; i++){
            let item = products[i];
        } */

       /* foreach loop
       products.forEach((product,index)=> {
            console.log(product.title)
        }) */

    });



