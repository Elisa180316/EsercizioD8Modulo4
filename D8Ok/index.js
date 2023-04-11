// Variabili spinner//
const loader = document.getElementById('loader');
const showLoader = () => {
    loader.style.display = 'block';
};
const hideLoader = () => {
    loader.style.display = 'none';
};

//Funzione asincrona recupero dati da api//

const getData = async () => {

    try {
        showLoader()
        const myProducts = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYWRhZGIxNGE1MTAwMTQ2NjQwMDYiLCJpYXQiOjE2ODA4OTI2OTAsImV4cCI6MTY4MjEwMjI5MH0.zZKWxE1PcFiJmN7mtF-9J-t0kKYxcJb_zrYWuWZtbzM"
            }

        })
        console.log(myProducts)
        if (myProducts.ok) {
            let products = await myProducts.json()
            console.log(products)
            hideLoader()
            return products
        } else {
            console.log("Something went wrong")
        }
    } catch (error) {
        console.log(error)
    }
}

//Funzione per creare le cards con i prodotti//

const createProducts = (products) => {
    const container = document.querySelector(".container")

    container.innerHTML = products.map((product) => `
    <div class="card-deck h-100 mt-5 g-3" >
    <a href="./backoffice.html?eventId=${product._id}">
    <img src="${product.imageUrl}" class="img-fluid text-center" alt="..." style="width: 100px"  </a>
    <div class="card-body ">
      <h5 class="card-title">${product.brand}</h5>
      <p class="card-text">${product.name}</p>
      <p class="card-text">${product.description}</p>
      <p class="card-text">${product.price}</p>
      
        <div class=" mt-4 mb-4">
     <a href="./details.html?eventId=${product._id}" 
       class="btn btn-primary" id="detailsButton">Details<a/>
      </div>  
      </div> 
  </div> `
    ).join("")
}

window.onload = async () => {
    let products = await getData()
    console.log("done", products)
    createProducts(products)
}
