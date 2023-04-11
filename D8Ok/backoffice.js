const eventId = new URLSearchParams(window.location.search).get("eventId");

//Funzione per creare/aggiornare un prodotto //

const getNewProducts = async (event) => {
  event.preventDefault();

  const createNewProducts = {
    name: document.querySelector("#name-input").value,
    description: document.querySelector("#description-input").value,
    brand: document.querySelector("#brand-input").value,
    imageUrl: document.querySelector("#image-input").value,
    price: document.querySelector("#price-input").value,
  };

  console.log(createNewProducts);

  try {
    const myProducts = await fetch(
      eventId
        ? "https://striveschool-api.herokuapp.com/api/product/" + eventId
        : "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: eventId ? "PUT" : "POST",
        body: JSON.stringify(createNewProducts),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYWRhZGIxNGE1MTAwMTQ2NjQwMDYiLCJpYXQiOjE2ODA4OTI2OTAsImV4cCI6MTY4MjEwMjI5MH0.zZKWxE1PcFiJmN7mtF-9J-t0kKYxcJb_zrYWuWZtbzM",
          "Content-Type": "application/json",
        },
      }
    );


    //Alert per prodotto creato/aggiornato positivo e negativo//
    if (myProducts.ok) {
      alert(`Application Done ${eventId ? "UPDATE" : "PRODUCT ADD"}`);

      document.querySelector("#name-input").value = "";
      document.querySelector("#description-input").value = "";
      document.querySelector("#brand-input").value = "";
      document.querySelector("#image-input").value = "";
      document.querySelector("#price-input").value = "";
    } else {
      alert("We have a problem, Try Again");
    }
  } catch (error) {
    console.log(error);
  }
};

//Funzioni tasto Delete//
const fetchDetails = async () => {

  try {
    let idFetch = await fetch(
      'https://striveschool-api.herokuapp.com/api/product/' + eventId,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYWRhZGIxNGE1MTAwMTQ2NjQwMDYiLCJpYXQiOjE2ODA4OTI2OTAsImV4cCI6MTY4MjEwMjI5MH0.zZKWxE1PcFiJmN7mtF-9J-t0kKYxcJb_zrYWuWZtbzM",
          "Content-type": "application/json",
        },
      }

    )
    console.log(idFetch)

    if (idFetch.ok) {
      let fetchDetails = await idFetch.json()
      console.log(fetchDetails)

      document.querySelector("#name-input").value = fetchDetails.name
      document.querySelector("#description-input").value = fetchDetails.description
      document.querySelector("#brand-input").value = fetchDetails.brand
      document.querySelector("#image-input").value = fetchDetails.imageUrl
      document.querySelector("#price-input").value = fetchDetails.price

    } else {
      alert("SOMETHING WENT WRONG")
    }

  } catch (error) {
    console.log(error)
  }
}

const deleteButton = async () => {
  try {
    let responseData = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + eventId,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkYWRhZGIxNGE1MTAwMTQ2NjQwMDYiLCJpYXQiOjE2ODA4OTI2OTAsImV4cCI6MTY4MjEwMjI5MH0.zZKWxE1PcFiJmN7mtF-9J-t0kKYxcJb_zrYWuWZtbzM",
          "Content-type": "application/json",
        },
      }
    );

    if (responseData.ok) {
      alert("product removed");
      window.location.assign("./index.html");

    } else {
      alert("Something is wrong, TRY AGAIN!");
    }

  } catch (error) {
    console.log(error);
  }
};

const deleteButtonToggle = () => {
  let deleteButton = document.querySelector("#delete-button");
  deleteButton.classList.toggle("d-none");
};


//Funzione per alternare update/create
const changeButtonText = () => {
  let label = eventId ? "UPDATE" : "CREATE";
  document.querySelector("#submitOrUpdateButton").innerText = label;
};

window.onload = () => {
  console.log(eventId);

  changeButtonText();

  if (eventId) {
    fetchDetails(eventId);
    deleteButtonToggle();
  }
};